import { Component } from '@angular/core';
import { BannerComponent } from '../../componente/banner/banner.component';
import { CarruselComponent } from '../../componente/carrusel/carrusel.component';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [BannerComponent,CarruselComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
