import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroMascotaComponent } from './filtro-mascota.component';

describe('FiltroMascotaComponent', () => {
  let component: FiltroMascotaComponent;
  let fixture: ComponentFixture<FiltroMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
