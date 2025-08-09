import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './stock-list.html',
  styleUrl: './stock-list.css',
})
export class StockList {
  searchTerm = '';
  location = inject(Location);

  stocks = [
    // Major Cryptocurrencies
    {
      symbol: 'BINANCE:BTCUSDT',
      name: 'Bitcoin',
      ticker: 'BTC',
      category: 'crypto',
      icon: '₿',
      color: 'bg-orange-500',
    },
    {
      symbol: 'BINANCE:ETHUSDT',
      name: 'Ethereum',
      ticker: 'ETH',
      category: 'crypto',
      icon: 'Ξ',
      color: 'bg-blue-500',
    },
    {
      symbol: 'BINANCE:SOLUSDT',
      name: 'Solana',
      ticker: 'SOL',
      category: 'crypto',
      icon: '◎',
      color: 'bg-purple-500',
    },
    {
      symbol: 'BINANCE:BNBUSDT',
      name: 'BNB',
      ticker: 'BNB',
      category: 'crypto',
      icon: '⬣',
      color: 'bg-yellow-500',
    },
    {
      symbol: 'BINANCE:XRPUSDT',
      name: 'XRP',
      ticker: 'XRP',
      category: 'crypto',
      icon: '●',
      color: 'bg-gray-600',
    },
    {
      symbol: 'BINANCE:ADAUSDT',
      name: 'Cardano',
      ticker: 'ADA',
      category: 'crypto',
      icon: '₳',
      color: 'bg-blue-600',
    },
    {
      symbol: 'BINANCE:DOGEUSDT',
      name: 'Dogecoin',
      ticker: 'DOGE',
      category: 'crypto',
      icon: 'Ð',
      color: 'bg-yellow-600',
    },
    {
      symbol: 'BINANCE:AVAXUSDT',
      name: 'Avalanche',
      ticker: 'AVAX',
      category: 'crypto',
      icon: '▲',
      color: 'bg-red-500',
    },
    {
      symbol: 'BINANCE:MATICUSDT',
      name: 'Polygon',
      ticker: 'MATIC',
      category: 'crypto',
      icon: '⬟',
      color: 'bg-purple-600',
    },
    {
      symbol: 'BINANCE:DOTUSDT',
      name: 'Polkadot',
      ticker: 'DOT',
      category: 'crypto',
      icon: '●',
      color: 'bg-pink-500',
    },
    {
      symbol: 'BINANCE:LTCUSDT',
      name: 'Litecoin',
      ticker: 'LTC',
      category: 'crypto',
      icon: 'Ł',
      color: 'bg-gray-500',
    },
    {
      symbol: 'BINANCE:TRXUSDT',
      name: 'TRON',
      ticker: 'TRX',
      category: 'crypto',
      icon: '⚡',
      color: 'bg-red-600',
    },

    // Additional Popular Cryptos
    {
      symbol: 'BINANCE:LINKUSDT',
      name: 'Chainlink',
      ticker: 'LINK',
      category: 'crypto',
      icon: '⛓',
      color: 'bg-blue-700',
    },
    {
      symbol: 'BINANCE:UNIUSDT',
      name: 'Uniswap',
      ticker: 'UNI',
      category: 'crypto',
      icon: '🦄',
      color: 'bg-pink-600',
    },
    {
      symbol: 'BINANCE:ATOMUSDT',
      name: 'Cosmos',
      ticker: 'ATOM',
      category: 'crypto',
      icon: '⚛',
      color: 'bg-indigo-600',
    },
    {
      symbol: 'BINANCE:FTMUSDT',
      name: 'Fantom',
      ticker: 'FTM',
      category: 'crypto',
      icon: '👻',
      color: 'bg-blue-800',
    },
    {
      symbol: 'BINANCE:NEARUSDT',
      name: 'NEAR Protocol',
      ticker: 'NEAR',
      category: 'crypto',
      icon: '🌐',
      color: 'bg-green-600',
    },
    {
      symbol: 'BINANCE:APTUSDT',
      name: 'Aptos',
      ticker: 'APT',
      category: 'crypto',
      icon: '🟠',
      color: 'bg-orange-600',
    },
    {
      symbol: 'BINANCE:INJUSDT',
      name: 'Injective',
      ticker: 'INJ',
      category: 'crypto',
      icon: '💉',
      color: 'bg-teal-600',
    },
    {
      symbol: 'BINANCE:ARBUSDT',
      name: 'Arbitrum',
      ticker: 'ARB',
      category: 'crypto',
      icon: '🔷',
      color: 'bg-blue-900',
    },
    {
      symbol: 'BINANCE:OPUSDT',
      name: 'Optimism',
      ticker: 'OP',
      category: 'crypto',
      icon: '🔴',
      color: 'bg-red-700',
    },
    {
      symbol: 'BINANCE:SUIUSDT',
      name: 'Sui',
      ticker: 'SUI',
      category: 'crypto',
      icon: '🌊',
      color: 'bg-cyan-600',
    },

    // Meme Coins
    {
      symbol: 'BINANCE:SHIBUSDT',
      name: 'Shiba Inu',
      ticker: 'SHIB',
      category: 'meme',
      icon: '🐕',
      color: 'bg-orange-700',
    },
    {
      symbol: 'BINANCE:PEPEUSDT',
      name: 'Pepe',
      ticker: 'PEPE',
      category: 'meme',
      icon: '🐸',
      color: 'bg-green-700',
    },
    {
      symbol: 'BINANCE:WIFUSDT',
      name: 'dogwifhat',
      ticker: 'WIF',
      category: 'meme',
      icon: '🐶',
      color: 'bg-brown-600',
    },
    {
      symbol: 'BINANCE:BONKUSDT',
      name: 'Bonk',
      ticker: 'BONK',
      category: 'meme',
      icon: '🔨',
      color: 'bg-yellow-700',
    },

    // DeFi Tokens
    {
      symbol: 'BINANCE:AAVEUSDT',
      name: 'Aave',
      ticker: 'AAVE',
      category: 'defi',
      icon: '👻',
      color: 'bg-purple-700',
    },
    {
      symbol: 'BINANCE:COMPUSDT',
      name: 'Compound',
      ticker: 'COMP',
      category: 'defi',
      icon: '🏦',
      color: 'bg-green-800',
    },
    {
      symbol: 'BINANCE:MKRUSDT',
      name: 'Maker',
      ticker: 'MKR',
      category: 'defi',
      icon: '🏗',
      color: 'bg-teal-700',
    },
    {
      symbol: 'BINANCE:CRVUSDT',
      name: 'Curve DAO',
      ticker: 'CRV',
      category: 'defi',
      icon: '📈',
      color: 'bg-yellow-800',
    },
    {
      symbol: 'BINANCE:LQTYUSDT',
      name: 'Liquity',
      ticker: 'LQTY',
      category: 'defi',
      icon: '💧',
      color: 'bg-blue-700',
    },

    // Gaming & NFT
    {
      symbol: 'BINANCE:SANDUSDT',
      name: 'The Sandbox',
      ticker: 'SAND',
      category: 'gaming',
      icon: '🎮',
      color: 'bg-indigo-700',
    },
    {
      symbol: 'BINANCE:MANAUSDT',
      name: 'Decentraland',
      ticker: 'MANA',
      category: 'gaming',
      icon: '🏛',
      color: 'bg-gray-700',
    },
    {
      symbol: 'BINANCE:AXSUSDT',
      name: 'Axie Infinity',
      ticker: 'AXS',
      category: 'gaming',
      icon: '🎯',
      color: 'bg-purple-800',
    },
    {
      symbol: 'BINANCE:ENJUSDT',
      name: 'Enjin Coin',
      ticker: 'ENJ',
      category: 'gaming',
      icon: '⚔',
      color: 'bg-indigo-800',
    },

    // AI & Technology
    {
      symbol: 'BINANCE:FETUSDT',
      name: 'Fetch.ai',
      ticker: 'FET',
      category: 'ai',
      icon: '🤖',
      color: 'bg-cyan-700',
    },
    {
      symbol: 'BINANCE:AGIXUSDT',
      name: 'SingularityNET',
      ticker: 'AGIX',
      category: 'ai',
      icon: '🧠',
      color: 'bg-purple-900',
    },
    {
      symbol: 'BINANCE:OCEANUSDT',
      name: 'Ocean Protocol',
      ticker: 'OCEAN',
      category: 'ai',
      icon: '🌊',
      color: 'bg-teal-800',
    },
    {
      symbol: 'BINANCE:RENDERUSDT',
      name: 'Render Token',
      ticker: 'RNDR',
      category: 'ai',
      icon: '🎨',
      color: 'bg-orange-800',
    },
  ];

  get filteredStocks() {
    const term = this.searchTerm.toLowerCase();
    return this.stocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(term) ||
        stock.ticker.toLowerCase().includes(term) ||
        stock.category.toLowerCase().includes(term)
    );
  }

  get stocksByCategory() {
    const categories = ['crypto', 'meme', 'defi', 'gaming', 'ai'];
    return categories
      .map((category) => ({
        name: this.getCategoryName(category),
        stocks: this.filteredStocks.filter(
          (stock) => stock.category === category
        ),
      }))
      .filter((cat) => cat.stocks.length > 0);
  }

  getCategoryName(category: string): string {
    const names: { [key: string]: string } = {
      crypto: '🪙 Major Cryptocurrencies',
      meme: '🎭 Meme Coins',
      defi: '🏦 DeFi Tokens',
      gaming: '🎮 Gaming & NFT',
      ai: '🤖 AI & Technology',
    };
    return names[category] || category;
  }

  goBack() {
    this.location.back();
  }
}
