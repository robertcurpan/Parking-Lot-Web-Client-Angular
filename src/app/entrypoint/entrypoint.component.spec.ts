import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrypointComponent } from './entrypoint.component';

describe('EntrypointComponent', () => {
  let component: EntrypointComponent;
  let fixture: ComponentFixture<EntrypointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrypointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrypointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
