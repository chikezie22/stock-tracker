import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockSocket {
  socket: WebSocket | null = null;

  connect(symbol: string) {
    this.socket = new WebSocket(
      `wss://ws.finnhub.io?token=${environment.finnhubApiKey}`
    );

    this.socket.onopen = () => {
      console.log('✅ WebSocket connected');
      if (symbol) {
        this.subscribeToStock(symbol);
      }
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type !== 'ping') {
        console.log('📈 Price update:', data);
      }
    };
  }

  subscribeToStock(symbol: string) {
    const message = JSON.stringify({ type: 'subscribe', symbol });
    this.socket?.send(message);
    console.log('📩 Subscribed to', symbol);
  }

  onMessage(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.onmessage = (event) => {
        const parsed = JSON.parse(event.data);
        if (parsed.type !== 'ping') {
          callback(parsed);
        }
      };
    }
  }
}
