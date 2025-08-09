import { Component, inject, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockSocket } from '../../services/stock-socket';
import { Location, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';

export type CandleChartOptions = {
  series: any;
  chart: any;
  plotOptions: any;
  xaxis: any;
  yaxis: any;
  title: any;
  grid: any;
  tooltip: any;
};

@Component({
  selector: 'app-stock-detail',
  imports: [DatePipe, FormsModule, NgApexchartsModule, DecimalPipe],
  templateUrl: './stock-detail.html',
  standalone: true,
})
export class StockDetail {
  private stockService = inject(StockSocket);
  route = inject(ActivatedRoute);
  location = inject(Location);

  symbol = signal('');
  stock = signal<any | null>(null);
  chartData = signal<any[]>([]);
  selectedInterval = 1;
  bufferedTrades: any[] = [];
  allTrades: any[] = []; // store everything for recalculation

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<CandleChartOptions> = {};

  private candleTimer: any;

  constructor() {
    const symbol = this.route.snapshot.paramMap.get('symbol');
    if (symbol) {
      this.symbol.set(symbol);
      this.setupChart();
      this.connectSocket(symbol);
      // Generate initial candles immediately if we have trades
      this.generateInitialCandle();
      this.startCandleTimer();
    }
  }

  setupChart() {
    this.chartOptions = {
      series: [{ data: this.chartData() }],
      chart: {
        type: 'candlestick',
        height: 450,
        background: 'transparent',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#10B981',
            downward: '#EF4444',
          },
          wick: {
            useFillColor: true,
          },
        },
      },
      title: {
        text: `${this.symbol()} - ${this.selectedInterval}min Interval`,
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#374151',
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false,
          style: {
            colors: '#6B7280',
          },
        },
        axisBorder: {
          color: '#E5E7EB',
        },
      },
      yaxis: {
        tooltip: { enabled: true },
        labels: {
          formatter: (val: number) => `${val.toFixed(2)}`,
          style: {
            colors: '#6B7280',
          },
        },
        axisBorder: {
          color: '#E5E7EB',
        },
      },
      grid: {
        borderColor: '#F3F4F6',
        strokeDashArray: 3,
      },
      tooltip: {
        theme: 'light',
        custom: function ({ seriesIndex, dataPointIndex, w }: any) {
          const data =
            w.globals.initialSeries[seriesIndex].data[dataPointIndex];
          if (!data) return '';

          const [open, high, low, close] = data.y;
          const time = new Date(data.x).toLocaleString();

          return `
            <div class="px-3 py-2 bg-white shadow-lg rounded-lg border">
              <div class="font-semibold mb-2">${time}</div>
              <div class="space-y-1 text-sm">
                <div class="flex justify-between">
                  <span>Open:</span>
                  <span class="font-medium">${open.toFixed(2)}</span>
                </div>
                <div class="flex justify-between">
                  <span>High:</span>
                  <span class="font-medium text-green-600">${high.toFixed(
                    2
                  )}</span>
                </div>
                <div class="flex justify-between">
                  <span>Low:</span>
                  <span class="font-medium text-red-600">${low.toFixed(
                    2
                  )}</span>
                </div>
                <div class="flex justify-between">
                  <span>Close:</span>
                  <span class="font-medium">${close.toFixed(2)}</span>
                </div>
              </div>
            </div>
          `;
        },
      },
    };
  }

  connectSocket(symbol: string) {
    this.stockService.connect(symbol);
    this.stockService.onMessage((data) => {
      if (data.type === 'trade') {
        const trade = data.data[0];
        this.stock.set(trade);
        this.bufferedTrades.push(trade);
        this.allTrades.push(trade); // keep for instant rebuild

        // If this is the first trade and no chart data exists, generate initial candle
        if (this.chartData().length === 0) {
          this.generateInitialCandle();
        }
      }
    });
  }

  generateInitialCandle() {
    // Create an initial candle from existing trades if any
    if (this.allTrades.length > 0 || this.bufferedTrades.length > 0) {
      const tradesToUse =
        this.allTrades.length > 0 ? this.allTrades : this.bufferedTrades;
      const initialCandles = this.groupTradesToCandles(
        tradesToUse,
        this.selectedInterval
      );
      if (initialCandles.length > 0) {
        this.chartData.set(initialCandles);
        this.chartOptions = {
          ...this.chartOptions,
          series: [{ data: initialCandles }],
        };
        this.bufferedTrades = []; // Clear buffer since we used the data
      }
    }
  }

  startCandleTimer() {
    if (this.candleTimer) clearInterval(this.candleTimer);
    this.candleTimer = setInterval(() => {
      this.generateCandle();
    }, this.selectedInterval * 60 * 1000);
  }

  changeInterval() {
    // Rebuild chart instantly from all historical trades
    const newCandles = this.groupTradesToCandles(
      this.allTrades,
      this.selectedInterval
    );
    this.chartData.set(newCandles);

    // Update chart options with new title and data
    this.chartOptions = {
      ...this.chartOptions,
      series: [{ data: newCandles }],
      title: {
        ...this.chartOptions.title,
        text: `${this.symbol()} - ${this.selectedInterval}min Interval`,
      },
    };

    // Clear buffered trades since we rebuilt from all trades
    this.bufferedTrades = [];

    // Restart timer for new interval
    this.startCandleTimer();
  }

  generateCandle() {
    if (this.bufferedTrades.length === 0) return;

    const newCandles = this.groupTradesToCandles(
      this.bufferedTrades,
      this.selectedInterval
    );

    let current = [...this.chartData()];

    // Merge or add new candles
    newCandles.forEach((newCandle) => {
      const existingIndex = current.findIndex((c) => c.x === newCandle.x);
      if (existingIndex >= 0) {
        // Update existing candle
        current[existingIndex] = newCandle;
      } else {
        // Add new candle
        current.push(newCandle);
      }
    });

    // Keep only last 50 candles
    if (current.length > 50) {
      current = current.slice(-50);
    }

    this.chartData.set(current);

    this.chartOptions = {
      ...this.chartOptions,
      series: [{ data: current }],
    };

    this.bufferedTrades = [];
  }

  groupTradesToCandles(trades: any[], interval: number) {
    if (trades.length === 0) return [];

    const candles: any[] = [];
    const msInterval = interval * 60 * 1000;

    // Sort trades by time to ensure proper grouping
    const sortedTrades = trades.sort(
      (a, b) => new Date(a.t).getTime() - new Date(b.t).getTime()
    );

    let candle: any = null;

    sortedTrades.forEach((t) => {
      const price = t.p;
      const time = new Date(t.t).getTime();

      // Round time down to interval boundary for consistent grouping
      const intervalStart = Math.floor(time / msInterval) * msInterval;

      if (!candle || intervalStart !== candle.start) {
        // Save previous candle
        if (candle) {
          candles.push({
            x: candle.start,
            y: [candle.open, candle.high, candle.low, candle.close],
          });
        }

        // Start new candle
        candle = {
          start: intervalStart,
          open: price,
          high: price,
          low: price,
          close: price,
        };
      } else {
        // Update existing candle
        candle.high = Math.max(candle.high, price);
        candle.low = Math.min(candle.low, price);
        candle.close = price;
      }
    });

    // Don't forget the last candle
    if (candle) {
      candles.push({
        x: candle.start,
        y: [candle.open, candle.high, candle.low, candle.close],
      });
    }

    return candles;
  }

  formatCurrency(value: number) {
    return `$${value.toLocaleString()}`;
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.candleTimer) {
      clearInterval(this.candleTimer);
    }
  }
}
