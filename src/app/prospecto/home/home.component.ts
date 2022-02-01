import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import {ProspectoServiceService} from '../service/prospecto-service.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  @ViewChild(ModalDirective) modal: ModalDirective;

  public prospecto:FormGroup;
  public prospectos:any;
  public formModal:FormGroup;
  public prospectoVar:any;
  public prospectoForm;
  public prospectoBusquedad = [
    {id:1,descripcion:"Id"},
    {id:2,descripcion:"Nombre"},
  ];  
  constructor(
    private service: ProspectoServiceService
  ) { }

  ngOnInit() {

    this.prospecto = new FormGroup({

      'prospecto': new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        
      ]),
      'descripcion': new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        
      ])

    });
    this.formModal = new FormGroup({

      'prospectoName': new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        
      ]),
      'prospectoAge': new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        
      ]),
      'prospectoMail': new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.email
        
      ]),
      
      'prospectoStatus': new FormControl(null, [
        Validators.required,
        
        
      ]),
      
      'prospectoId': new FormControl(null, [
        Validators.required,
        
        
      ])

    });
    this.prospectoVar = {
      prospecto: "",
      descripcion:""
    }
    this.prospectoForm = {
      prospectoName:'',
      prospectoAge:'',
      prospectoMail:'',
      prospectoStatus:'',
      prospectoId:''
    }
      
  }

  Buscar(uris){
   
    let urisService;

    if(uris.prospecto == 1){
     urisService = '/'+ uris.descripcion;
    }else if (uris.prospecto == 2){
      urisService = `?page=0&size=5&sort=prospectoId&sort=desc&prospectoName=${uris.descripcion}`
    }
      this.service.Get(urisService)
        .subscribe(
          data => {
            this.prospectos = data;
            console.log(this.prospectos);
            console.log(uris);
            if (data.status == 200) {
              
              console.log("si");
              
  
            } else if (data.status == 404) {
              // this.toastr.warning(data.message, 'Advertencia!');
            } else {
              // this.toastr.error(data.message, 'Error!');
            }
            
          },
          Error => {
            if (Error.status == 401) {
   
            } else {
              // this.toastr.error('Ocurrio un error con el servicio', 'Error!');
            }
          }
        );
  }
  hide(): void {
    this.modal.hide();
    this.ngOnInit();
  }
  Edit(item) {
    this.modal.show();

  }

  Save(item) {
  
    var body;
      body = JSON.stringify({
        prospectoName: item.prospectoName,
        prospectoAge: item.prospectoAge,
        prospectoMail: item.prospectoMail,
        prospectoId: item.prospectoId,
        prospectoStatus: item.prospectoStatus
      });
  
      this.service.Send(body, 1)
      .subscribe(
        data => {

          if (data.status == 200) {
            //this.swall.swallAlert(data.message, 1)
          } else if (data.status == 404) {
            //this.swall.swallAlert(data.message, 2)
            console.log("error 404");
          } else if (data.status == 406) {
            //this.swall.swallAlert(data.message, 2)
            console.log("error 406");

          } else {
            //this.swall.swallAlert(data.message, 3)
            console.log("error else");
          }
        },
        Error => {

          if (Error.status == 401) {
            //this.service.redirect();
            console.log("error 401");
          } else {
            //this.swall.swallAlert("Ocurrio un error!", 3)
            console.log("error else 2");
          }
        }
      );
    this.ngOnInit();
    this.hide();

  }


 Borrar(uris){

      this.service.Delete(uris)
        .subscribe(
          data => {
            this.prospectos = data;
            console.log(this.prospectos);
            console.log(uris);
            if (data.status == 200) {
              
              console.log("si");
              
  
            } else if (data.status == 404) {
              // this.toastr.warning(data.message, 'Advertencia!');
            } else {
              // this.toastr.error(data.message, 'Error!');
            }
            
          },
          Error => {
            if (Error.status == 401) {
   
            } else {
              // this.toastr.error('Ocurrio un error con el servicio', 'Error!');
            }
          }
        );
          this.ngOnInit();
    this.hide();
  }


}
