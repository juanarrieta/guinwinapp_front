import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  nombreChat: any;
  idVendedor: any;
  classMsnV: any;
  classMsnC: any;
  idComprador: any;
  idPublicacion: any;
  mensajes: any;
  newMessage: string = '';
  idUsuario: any;
  totalMsnRecib: any;
  msnEnviados: any;
  msnEnvTotal: any;
  blockEnvio: any;
  comprador: any;
  enviosRestantes: any;

  constructor(
     private activatedRoute: ActivatedRoute
    ,private http: HttpClient
    ,private alertController: AlertController
  ) { }

  ngOnInit() {    
    setTimeout(() => {
      document.querySelector('app-chat')?.querySelector('ion-toolbar')?.shadowRoot?.querySelector('.toolbar-background')?.remove();
    }, 1000); 
    
    this.blockEnvio = false;
    this.idPublicacion = this.activatedRoute.snapshot.paramMap.get("idPublicacion");
    this.idVendedor = this.activatedRoute.snapshot.paramMap.get("idVendedor");
    this.idComprador = this.activatedRoute.snapshot.paramMap.get("idComprador");
    this.idUsuario = localStorage.getItem('idUsuario');

    this.comprador = true;

    if(this.idUsuario == this.idVendedor)
      this.comprador = false;

    this.validarEnvio().subscribe(res =>{  
      this.totalMsnRecib = res.TOT_MSN_RECIB; //Cantidad total de mensajes que puede recibir el usuario con el que se habla
      this.msnEnviados = res.MSN_ENVIADOS; //Cantidad de mensajes enviados a el usuario con el que se habla
      this.msnEnvTotal = res.MSN_ENV_TOTAL; //Cantidad total de mensajes que se pueden enviar por usuario

      this.enviosRestantes = '';

      //Valida si el emisor tiene envios infinitos y el receptor tiene limite en recepcion de mensajes
      if(this.msnEnvTotal == -1 && this.totalMsnRecib != -1){
        let msn = this.totalMsnRecib - this.msnEnviados
        if(msn > 0)
          this.enviosRestantes = this.enviosRestantes + 'Se pueden enviar '+ msn + ' mensajes a este usuario.';
      }
      
      /*Valida si el emisor tiene limite en el envio de mensajes y el receptor tiene recepcion 
      infinita de mensajes o si tanto el emisor como el receptor tienen limite de envio y 
      recepcion de mensajes*/
      if((this.msnEnvTotal != -1 && this.totalMsnRecib == -1) || (this.msnEnvTotal != -1 && this.totalMsnRecib != -1)){
        let msn = this.msnEnvTotal - this.msnEnviados
        if(msn > 0)
          this.enviosRestantes = this.enviosRestantes + 'Se pueden enviar '+ msn + ' mensajes a este usuario.';
      }

      //Se valida que no se haya sobre pasado la cantidad de mensajes enviados
      if((this.msnEnviados >= this.msnEnvTotal) && this.msnEnvTotal != -1){
        this.blockEnvio = true;
        this.newMessage = 'No puede enviar mas mensajes a este usuario.';
      }
    })

    this.getMensajesPublicacion().subscribe(res =>{
      //Configuracion cuando el usuario activo es el comprador
      this.nombreChat = res[0].VENDEDOR;
      this.classMsnV = 'received';
      this.classMsnC = 'sent';

      //Configuracion cuando el usuario activo es el vendedor
      if(this.idUsuario == this.idVendedor){
        this.nombreChat = res[0].COMPRADOR;
        this.classMsnV = 'sent';
        this.classMsnC = 'received';
      }        

      this.mensajes = res;
    })

    //Se marcan como leidos (1) todos los mensajes de este chat.
    this.setLeido().subscribe(res =>{
    })
  }

  getMensajesPublicacion(){
    var url_api = environment.url_api +"getMensajesPublicacion/"+this.idPublicacion+"/"+this.idVendedor+"/"+this.idComprador; 

    return this.http
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res.res;
      })
    )
  }
     
  setLeido(){
    var url_api = environment.url_api +"setLeido/"+this.idPublicacion+"/"+this.idComprador+"/"+this.idUsuario; 

    return this.http
    .get(url_api)
    .pipe(
      map((res:any)=>{
      })
    )
  }

  validarEnvio(){
    var url_api = environment.url_api +"validarEnvio/"+this.idVendedor+"/"+this.idComprador+"/"+this.comprador; 

    return this.http
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res;
      })
    )
  }

  async enviarMensaje() {
    try{   
      if(this.newMessage){
        if((this.msnEnviados < this.totalMsnRecib) || this.totalMsnRecib == -1){
          this.enviarMsn().subscribe(async res =>{
            if(res != "1"){
              const alert = await this.alertController.create({
                message: res,
                buttons: ['OK']
              });
              await alert.present();
            }
            else{
              location.reload();
            }
          })
        }
        else{
          const alert = await this.alertController.create({
            message: "EL usuario no puede recibir mas mensajes.",
            buttons: ['OK']
          });
          await alert.present();
        }
      }      
      else{
        const alert = await this.alertController.create({
          header: "¡Error!",
          message: "Debe escribir un mensaje.",
          buttons: ['OK']
        });      
        await alert.present();
      }
    }
    catch(error) {
      console.error('Error:', error);
      const alert = await this.alertController.create({
        header: "¡Error!",
        message: "Ocurrio un error al intentar enviar el mensaje, contacte al administrador del sistema.",
        buttons: ['OK']
      });      
      await alert.present();
    }
  }

  enviarMsn(){
    var url_api = environment.url_api +"enviarMsn"; 
   
    const data = {
      idPublicacion: this.idPublicacion
     ,idComprador: this.idComprador
     ,idVendedor: this.idVendedor 
     ,mensaje: this.newMessage
     ,comprador: this.comprador
   };

   const headers = new HttpHeaders({
     'Content-Type': 'application/json'
   });

   return this.http
     .post(url_api, data, { headers })
     .pipe(
       map((res: any) => {       
         return res;
       })
     );     
  }
}
