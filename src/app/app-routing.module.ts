import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'busqueda-ini1',
    pathMatch: 'full'
  },
  {
    path: 'busqueda-ini1',
    loadChildren: () => import('./busqueda-inicial/busqueda-ini1/busqueda-ini1.module').then( m => m.BusquedaIni1PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'busqueda-ini2',
    loadChildren: () => import('./busqueda-inicial/busqueda-ini2/busqueda-ini2.module').then( m => m.BusquedaIni2PageModule)
  },
  {
    path: 'busqueda-ini3',
    loadChildren: () => import('./busqueda-inicial/busqueda-ini3/busqueda-ini3.module').then( m => m.BusquedaIni3PageModule)
  },
  {
    path: 'busqueda-ini5',
    loadChildren: () => import('./busqueda-inicial/busqueda-ini5/busqueda-ini5.module').then( m => m.BusquedaIni5PageModule)
  },
  {
    path: 'busqueda-ini6',
    loadChildren: () => import('./busqueda-inicial/busqueda-ini6/busqueda-ini6.module').then( m => m.BusquedaIni6PageModule)
  },
  {
    path: 'comprar',
    loadChildren: () => import('./comprar/comprar.module').then( m => m.ComprarPageModule)
  },
  {
    path: 'publicar',
    loadChildren: () => import('./publicar/publicar.module').then( m => m.PublicarPageModule)
  },
  {
    path: 'filtros',
    loadChildren: () => import('./filtros/filtros.module').then( m => m.FiltrosPageModule)
  },
  {
    path: 'comprar/detalle/:idPublicacion',
    loadChildren: () => import('./comprar/detalle/detalle.module').then( m => m.DetallePageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'buzon-mensajes',
    loadChildren: () => import('./buzon-mensajes/buzon-mensajes.module').then( m => m.BuzonMensajesPageModule)
  },
  {
    path: 'chat/:idPublicacion/:idVendedor/:idComprador',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'historial-busqueda',
    loadChildren: () => import('./historial-busqueda/historial-busqueda.module').then( m => m.HistorialBusquedaPageModule)
  },
  {
    path: 'gestor-publicaciones',
    loadChildren: () => import('./gestor-publicaciones/gestor-publicaciones.module').then( m => m.GestorPublicacionesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
