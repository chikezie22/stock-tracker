import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetail } from './stock-detail';
import { ActivatedRoute } from '@angular/router';

describe('StockDetail', () => {
  let component: StockDetail;
  let fixture: ComponentFixture<StockDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'AAPL' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StockDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
