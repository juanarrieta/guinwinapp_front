import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  nombre: string = '';
  telefono: string = '';
  direccion: string = '';
  clave: string = '';
  claveConf: string = '';
  fechaNac: string = '';
  mostrarFecha: boolean = false;
  paises:any = [];
  departamentos:any = [];
  ciudades:any = [];
  selPais: any = null;
  selDepartamento: any = null;
  selCiudad: any = null;
  correo: string = '';

  constructor(
     private router: Router
    ,private http: HttpClient
    ,private alertController: AlertController
  ) { 
  }

  ngOnInit() {
    this.nombre = ' ';
    this.telefono = ' ';
    this.direccion = ' ';
    this.clave = ' ';
    this.claveConf = ' ';
    this.correo = ' ';

    this.getPaises().subscribe(res =>{
      this.paises = res;
    })

    setTimeout(() => {
      document.querySelector('ion-toolbar')?.shadowRoot?.querySelector('.toolbar-background')?.remove();
    }, 1000);   
  }

  getPaises(){    
    var url_api = environment.url_api + "getPaises"; 

    return this.http     
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res;
      }) 
    )
  }

   cargarDepartamentos(event: any){
    const pais = event.detail.value;
    this.selPais = pais;
    this.selDepartamento = null;
    this.selCiudad = null;
    this.ciudades = []; 

    this.getDepartamentos(pais).subscribe(res =>{
      this.departamentos = res;      
    })  
  }

  getDepartamentos(pais: any){
    var url_api = environment.url_api +"getDepartamentos/"+pais; 

    return this.http     
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res;
      }) 
    )
  }

  cargarCiudades(event: any){    
    const departamento = event.detail.value;
    this.selCiudad = null;

    this.getCiudades(departamento).subscribe(res =>{
      this.ciudades = res;      
    })    
  }

  getCiudades(departamento: any){
    var url_api = environment.url_api +"getCiudades/"+departamento; 

    return this.http     
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res;
      }) 
    );
  }

  async registrarse() {
    let msn = ""

    if(!this.validarCorreoElectronico())
      msn = "EL correo ingresado no es valido.\n";

    if(!this.validarContrasena())
      msn = msn + "La contraseña ingresada no es valida, esta debe contener minimo una mayuscula, caracter especial y ser de 6 caracteres o mas.\n";
  
    if(this.clave !== this.claveConf)
      msn = msn + "La clave y la clave de confirmacion no son iguales.\n";

    if(this.estaVacia(this.nombre))
      msn = msn + "Debe diligenciar el campo nombre.\n";
      
    if(this.estaVacia(this.correo))
      msn = msn + "Debe diligenciar el campo correo electronico.\n"; 

    if(this.estaVacia(this.clave))
      msn = msn + "Debe diligenciar el campo clave.\n";

    if(this.estaVacia(this.selPais))
      msn = msn + "Debe seleccionar un pais.\n";

    if(this.estaVacia(this.selDepartamento))
      msn = msn + "Debe seleccionar un departamento.\n";

    if(this.estaVacia(this.selCiudad))
      msn = msn + "Debe seleccionar una ciudad.\n";

    if(msn){
      const alert = await this.alertController.create({
        header: "¡Error!",
        message: msn,
        buttons: ['OK']
      });
      await alert.present();
    }
    else{   
      try {  
        this.registrarUsuario().subscribe(async res =>{
          if(res.mensaje == 'El usuario fue registrado correctamente.'){
            const alert = await this.alertController.create({
              header: "Éxito",
              message: res.mensaje,
              buttons: ['OK']
            });
            await alert.present();
            this.router.navigate(['/login']);
          }
          else{
            const alert = await this.alertController.create({
              header: "¡Error!",
              message: res.mensaje,
              buttons: ['OK']
            });
            await alert.present();
          }
        }) 
      } catch (error) {
        console.error('Error:', error);
      }
    }
   }

   registrarUsuario(){
    var url_api = environment.url_api +"registrarUsuario"; 

    if(this.estaVacia(this.telefono))
      this.telefono = '0';

    const data = { 
       nombre: this.nombre
      ,telefono: this.telefono
      ,direccion: this.direccion
      ,clave: this.clave
      ,fechaNac: this.fechaNac
      ,pais: this.selPais
      ,departamento: this.selDepartamento
      ,ciudad: this.selCiudad
      ,correo: this.correo
    }; 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http     
    .post(url_api, data, { headers })
    .pipe(
      map((res:any)=>{
        return res;
      }) 
    );
  }

  validarCorreoElectronico(): boolean {
    const patronValidacion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return patronValidacion.test(this.correo) && !this.estaVacia(this.correo) ;
  }

  validarContrasena(): boolean {
    const patronMayuscula = /[A-Z]/;
    const patronCaracterEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
    return this.clave.length >= 6 && patronMayuscula.test(this.clave) && patronCaracterEspecial.test(this.clave) && !this.estaVacia(this.clave);
  }
  
  estaVacia(variable: any): boolean {
    return variable === null || variable === undefined || variable === ' ';
  }
}
