import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { StockList } from './stock-list';

describe('StockList', () => {
  let component: StockList;
  let fixture: ComponentFixture<StockList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockList, RouterTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StockList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial stocks list', () => {
    expect(component.stocks.length).toBeGreaterThan(0);
    expect(component.stocks.length).toBeGreaterThan(37);
  });

  it('should filter stocks by name', () => {
    component.searchTerm = 'bitcoin';
    const filtered = component.filteredStocks;
    expect(filtered.length).toBe(1);
    expect(filtered[0].name.toLowerCase()).toContain('bitcoin');
  });

  it('should filter stocks by ticker', () => {
    component.searchTerm = 'BTC';
    const filtered = component.filteredStocks;
    expect(filtered.length).toBe(1);
    expect(filtered[0].ticker).toBe('BTC');
  });

  it('should filter stocks by category', () => {
    component.searchTerm = 'meme';
    const filtered = component.filteredStocks;
    expect(filtered.length).toBeGreaterThan(0);
    filtered.forEach((stock) => {
      expect(stock.category).toBe('meme');
    });
  });

  it('should return empty array when no matches found', () => {
    component.searchTerm = 'nonexistentstock';
    const filtered = component.filteredStocks;
    expect(filtered.length).toBe(0);
  });

  it('should group stocks by category correctly', () => {
    const categories = component.stocksByCategory;
    expect(categories.length).toBeGreaterThan(0);

    const cryptoCategory = categories.find((cat) =>
      cat.name.includes('Major Cryptocurrencies')
    );
    expect(cryptoCategory).toBeDefined();
    expect(cryptoCategory?.stocks.length).toBeGreaterThan(0);
  });

  it('should get correct category names', () => {
    expect(component.getCategoryName('crypto')).toBe(
      '🪙 Major Cryptocurrencies'
    );
    expect(component.getCategoryName('meme')).toBe('🎭 Meme Coins');
    expect(component.getCategoryName('defi')).toBe('🏦 DeFi Tokens');
    expect(component.getCategoryName('gaming')).toBe('🎮 Gaming & NFT');
    expect(component.getCategoryName('ai')).toBe('🤖 AI & Technology');
  });

  it('should have proper stock structure', () => {
    const stock = component.stocks[0];
    expect(stock.symbol).toBeDefined();
    expect(stock.name).toBeDefined();
    expect(stock.ticker).toBeDefined();
    expect(stock.category).toBeDefined();
    expect(stock.icon).toBeDefined();
    expect(stock.color).toBeDefined();
  });
});
