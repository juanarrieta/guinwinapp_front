import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {  
  usuario: any = '';

  public appPages = [
     { title: 'Login', url: '/login', icon: 'people' }
    ,{ title: 'Filtros', url: '/filtros', icon: 'funnel' }
    ,{ title: 'Comprar', url: '/comprar', icon: 'cart' }    
    ,{ title: 'Registrarse', url: '/registrarse', icon: 'finger-print' }  
  ];
  
  constructor() {   
    //Cuando se agrega aca un menu tambien se debe modificar el archivo TS del login
    if(localStorage.getItem('usuario')){
      this.appPages.splice(0,1);
      this.usuario = localStorage.getItem('usuario')?localStorage.getItem('usuario'):'Usuario';
      this.appPages.push({ title: this.usuario, url: '/comprar', icon: 'person-circle' } );
      this.appPages.push({ title: 'Publicar', url: '/publicar', icon: 'rocket' } );
      this.appPages.push({ title: 'Buzon', url: '/buzon-mensajes', icon: 'mail-unread'} );
      this.appPages.push({ title: 'Gestor Publicaciones', url: '/gestor-publicaciones', icon: 'briefcase'} );
      this.appPages.push({ title: 'Historial Busqueda', url: '/historial-busqueda', icon: 'list'} );
      this.appPages.push({ title: 'Cerrar sesion', url: '/login', icon: 'arrow-back-circle' } );      
    }
  }
}
