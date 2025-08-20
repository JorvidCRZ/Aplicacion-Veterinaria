import { Component } from '@angular/core';
import { MenuItem } from '../../core/models/menu-item';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
}
