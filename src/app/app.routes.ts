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
import { UsuarioComponent } from './features/private/dashboard/cliente/usuario/usuario.component';
import { AdminComponent } from './features/private/dashboard/admin/admin.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ResumenComponent } from './features/private/dashboard/cliente/resumen/resumen.component';
import { PerfilComponent } from './features/private/dashboard/cliente/perfil/perfil.component';
import { MisCitasComponent } from './features/private/dashboard/cliente/mis-citas/mis-citas.component';
import { MisAdopcionesComponent } from './features/private/dashboard/cliente/mis-adopciones/mis-adopciones.component';
import { MisPedidosComponent } from './features/private/dashboard/cliente/mis-pedidos/mis-pedidos.component';
import { MisMascotasComponent } from './features/private/dashboard/cliente/mis-mascotas/mis-mascotas.component';


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
    { path: 'detalle-producto/:id', component: DetalleProductoComponent },
    {
        path: 'usuario',
        component: UsuarioComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'resumen', pathMatch: 'full' },
            { path: 'resumen', component: ResumenComponent },
            { path: 'perfil', component: PerfilComponent },
            { path: 'mascotas', component: MisMascotasComponent },
            { path: 'citas', component: MisCitasComponent },
            { path: 'adopciones', component: MisAdopcionesComponent },
            { path: 'pedidos', component: MisPedidosComponent }
        ]
    },

    // Rutas para el dashboard de administrador
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'panel', pathMatch: 'full' },
            { path: 'panel', loadComponent: () => import('./features/private/dashboard/admin/panel/panel.component').then(m => m.PanelComponent) },
            { path: 'usuarios', loadComponent: () => import('./features/private/dashboard/admin/usuarios/usuarios.component').then(m => m.UsuariosComponent) },
            { path: 'mascotas', loadComponent: () => import('./features/private/dashboard/admin/mascotas/mascotas.component').then(m => m.MascotasComponent) },
            { path: 'productos', loadComponent: () => import('./features/private/dashboard/admin/productos/productos.component').then(m => m.ProductosComponent) },
            
            { path: 'pedidos', loadComponent: () => import('./features/private/dashboard/admin/pedidos/pedidos.component').then(m => m.PedidosComponent) },
            { path: 'citas', loadComponent: () => import('./features/private/dashboard/admin/citas/citas.component').then(m => m.CitasComponent) }
        ]
    }

];
