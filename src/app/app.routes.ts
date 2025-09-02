import { Routes } from '@angular/router';
import { InicioComponent } from './features/public/pages/inicio/inicio.component';
import { NosotrosComponent } from './features/public/pages/nosotros/nosotros.component';
import { ServiciosComponent } from './features/public/pages/servicios/servicios.component';
import { ProductosComponent } from './features/public/pages/productos/productos.component';
import { AdopcionComponent } from './features/public/pages/adopcion/adopcion.component';
import { ContactoComponent } from './features/public/pages/contacto/contacto.component';
import { LoginComponent } from './features/auth/login/login.component';
import { CarritoComponent } from './features/public/pages/carrito/carrito.component';
import { CheckoutComponent } from './features/private/checkout/checkout.component';
import { RegistroComponent } from './features/auth/registro/registro.component';
import { ServicioFormularioComponent } from './features/public/components/servicio-formulario/servicio-formulario.component';
import { DetalleProductoComponent } from './features/public/components/detalle-producto/detalle-producto.component';
import { UsuarioComponent } from './features/private/dashboard/usuario/usuario.component';
import { AuthGuard } from './core/guards/auth.guard';

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
    { path: 'checkout', component: CheckoutComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'servicio-formulario', component: ServicioFormularioComponent, canActivate: [AuthGuard] },
    { path: 'detalle-producto/:id', component: DetalleProductoComponent }
];
