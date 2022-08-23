import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingStatusComponent } from './parking-status.component';

describe('ParkingStatusComponent', () => {
  let component: ParkingStatusComponent;
  let fixture: ComponentFixture<ParkingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
