import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourLogEditorComponent } from './tour-log-editor.component';

describe('TourLogEditorComponent', () => {
  let component: TourLogEditorComponent;
  let fixture: ComponentFixture<TourLogEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourLogEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourLogEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
