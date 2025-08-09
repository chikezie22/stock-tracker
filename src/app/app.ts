import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockSocket } from './services/stock-socket';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  public title = signal('stock-tracker');
}
