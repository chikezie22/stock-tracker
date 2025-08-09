import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Landing } from './landing';
import { ActivatedRoute } from '@angular/router';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'AAPL' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Landing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
