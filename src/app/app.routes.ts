import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AdopcionComponent } from './pages/adopcion/adopcion.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: InicioComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'adopcion', component: AdopcionComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'checkout', component: CheckoutComponent }
];
