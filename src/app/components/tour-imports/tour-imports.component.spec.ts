import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourImportsComponent } from './tour-imports.component';

describe('TourImportsComponent', () => {
  let component: TourImportsComponent;
  let fixture: ComponentFixture<TourImportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourImportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourImportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
