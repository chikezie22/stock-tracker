import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { StockDetail } from './pages/stock-detail/stock-detail';
import { StockList } from './pages/stock-list/stock-list';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'stocks', component: StockList },
  { path: 'stocks/:symbol', component: StockDetail },
];
