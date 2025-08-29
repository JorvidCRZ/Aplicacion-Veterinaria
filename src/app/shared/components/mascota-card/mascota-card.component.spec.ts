import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaCardComponent } from './mascota-card.component';

describe('MascotaCardComponent', () => {
  let component: MascotaCardComponent;
  let fixture: ComponentFixture<MascotaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
