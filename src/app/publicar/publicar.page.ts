import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {

  imagenesSeleccionadas: string[] = [];
  nombre: string = '';
  descripcion: string = '';
  precio: string = '';
  ciudades: any = [];
  selCiudad: any = null;
  selModulo: any = null;
  files: any = [];
  departamento: any = null;
  imagenes: any = '';
  bloqueado: boolean = false;
  bloqueadoImg: boolean = false;

  constructor(
     private http: HttpClient
    ,private alertController: AlertController
  ) { }

  ngOnInit() {
    this.nombre = ' ';
    this.precio = ' ';
    this.descripcion = ' ';
    
    this.cargarCiudades();

    setTimeout(() => {
      document.querySelector('ion-toolbar')?.shadowRoot?.querySelector('.toolbar-background')?.remove();
    }, 1000);   
  }

  cargarCiudades() {
    this.getDepartamentoUsu().subscribe(res => {
      this.departamento = res;
      this.selCiudad = null;
      
      this.getCiudades(this.departamento).subscribe(res => {
        this.ciudades = res;
      })
    })
  }

  getDepartamentoUsu() {
    var url_api = environment.url_api + "getDepartamentoUsu/" + localStorage.getItem('correo');

    return this.http
      .get(url_api)
      .pipe(
        map((res: any) => {
          return res[0].DEPARTAMENTO;
        })
      );
  }

  getCiudades(departamento: any) {
    var url_api = environment.url_api + "getCiudades/" + departamento;

    return this.http
      .get(url_api)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  guardarModulo(event: any) {
    localStorage.setItem('modulo', event.detail.value);
  }

  
  async cargarFotos(fotos: any) {
    var url_api = environment.url_api + "upload/";

    const nombres = fotos.split('/');

    if(this.files){
      for (let i = 0; i < this.files.length; i++) {
        const formData = new FormData();
        const file = this.files[i];
        const nombre = nombres[i];
        formData.append('image', file);    
        formData.append('nuevoNombre', nombre);
        try {      
          const response = await this.http.post(url_api, formData).toPromise();
          console.log('Respuesta del servidor:', response);
        } catch (error) {
          console.error('Error al enviar la imagen:', JSON.stringify(error));
        }
      }
    }    
  }

  async publicar() {   
    this.bloqueado = true;

    let msn = '';

    if(this.estaVacia(this.nombre))
      msn = msn + "Debe diligenciar el campo nombre.\n";

    if(this.files.length==0)
      msn = msn + "Cargar al menos una foto.\n";

    if(this.estaVacia(this.selModulo))
      msn = msn + "Debe seleccionar un modulo.\n";

    if(this.estaVacia(this.precio))
      msn = msn + "Debe ingresar el precio.\n";

    if(this.estaVacia(this.selCiudad))
      msn = msn + "Debe seleccionar una ciudad.\n";
   
    this.validarCuentaPublicacion().subscribe(async res => {      
      if(!res.res)
        msn = "Se han alcanzado la cantidad de publicaciones permitidas para este tipo de cuenta.";
      
      if(!msn){
        try {
          this.crearPublicacion().subscribe(async res => {
            const alert = await this.alertController.create({
              message: 'La publicacion se registro correctamente.',
              buttons: ['OK']
            });
            await alert.present();
            this.bloqueado = false;
            this.bloqueadoImg = false;
            this.limpiarCampos();
          })
        } catch (error) {
          console.error('Error:', error);
        }
      }
      else{
        const alert = await this.alertController.create({
          message: msn,
          buttons: ['OK']
        });
        await alert.present();
        this.bloqueado = false;
      }
    })  
  }

  validarCuentaPublicacion(){
    const idUsuario = localStorage.getItem('idUsuario');

    var url_api = environment.url_api + "validarCuentaPublicacion/"+ idUsuario;

    return this.http
    .get(url_api)
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  estaVacia(variable: any): boolean {
    return variable === null || variable === undefined || variable === '';
  }

  crearPublicacion() {
    var url_api = environment.url_api + "publicar";

    if(this.files){
      for (let i = 0; i < this.files.length; i++) {
        this.imagenes = this.imagenes + this.files[i].name;

        if(i < this.files.length-1)
          this.imagenes = this.imagenes + "/";
      }
    }

    const data = {
       nombre: this.nombre
      ,precio: this.precio
      ,descripcion: this.descripcion
      ,ciudad: this.selCiudad
      ,modulo: this.selModulo
      ,fotos: this.imagenes
      ,foto_pri: this.files[0].name
      ,departamento: this.departamento
      ,vendedor: localStorage.getItem('idUsuario')
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(url_api, data, { headers })
      .pipe(
        map((res: any) => {          
          this.cargarFotos(res);
          return res;
        }),
        delay(2000)
      );
  }

//Registrar en la variable this.files los archivos que se van a subir y muestra las miniaturas de las imagenes seleccionadas
  async incluirImagen(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    const imagePreviews = document.getElementById('imagePreviews');
    
    if (imagePreviews && files) {
      if(files.length < 5){
      if (files[0].type.startsWith('image/') && files[0].size <= 4 * 1024 * 1024) {
        // Iterar a través de los archivos seleccionados
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          this.files.push(files[i]);
  
          // Verificar que el archivo sea una imagen
          if (file.type.startsWith('image/')) {
            const img = document.createElement('ion-img');
            img.src = URL.createObjectURL(file);

            // Agregar la miniatura al contenedor
            imagePreviews.appendChild(img);
          }
        }
      }
      else{
        const alert = await this.alertController.create({
          message: "El formatato o tamaño de la imagen no es el correcto; tamaño max 4 MB y formato debe ser png, jpeg o jpg.",
          buttons: ['OK']
        });
        await alert.present();
      }
    
      if(this.files.length > 3)
        this.bloqueadoImg = true;
      }
      else{
        const alert = await this.alertController.create({
          message: "Solo puede subir un maximo de 4 fotografias",
          buttons: ['OK']
        });
        await alert.present();
        this.files = [];
      }
    }
  }

  limpiarCampos(){
    this.files = [];
    this.selModulo = '';
    this.nombre = '';
    this.descripcion = '';
    this.precio = '';
    this.selCiudad = '';
    const imagePreviews = document.getElementById('imagePreviews');
    if (imagePreviews) 
      imagePreviews.innerHTML = '';
  }
}
