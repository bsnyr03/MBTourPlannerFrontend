import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourExportsComponent } from './tour-exports.component';

describe('TourExportsComponent', () => {
  let component: TourExportsComponent;
  let fixture: ComponentFixture<TourExportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourExportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourExportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
