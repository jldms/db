import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { NgbActiveModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../cliente/services/cliente.service';
import { Cliente } from '../../cliente/models/cliente';
import { DocumentReference } from '../../../../node_modules/@angular/fire/firestore';
import { ClienteViewModel } from '../../cliente/models/cliente-view-model';


@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  clienteForm: FormGroup;
  modoInsercao : boolean = true;
  cliente: ClienteViewModel;
  
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private clienteService : ClienteService
    
  ) { }

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      casado: false
    })

    if(!this.modoInsercao){
      this.carregarTudo(this.cliente);
    }
  }

  carregarTudo(cliente){
    this.clienteForm.patchValue(cliente);
  }

/*
  salvarCliente(){
    if(this.clienteForm.invalid){
      return;
    }

    let cliente : Cliente = this.clienteForm.value;
    cliente.dataMod = new Date();
    cliente.dataCad = new Date();
   
    this.clienteService.salvarClientes(cliente)
    .then(response => this.handleSuccessSave(response, cliente))
    .catch(err => console.error(err));

  }
  */

 salvarCliente(){
  if(this.clienteForm.invalid){
    return;
  }

  if(this.modoInsercao){
    let cliente : Cliente = this.clienteForm.value;
    cliente.dataMod = new Date();
    cliente.dataCad = new Date();
   
    this.clienteService.salvarClientes(cliente)
    .then(response => this.handleSuccessSave(response, cliente))
    .catch(err => console.error(err));
  }else{
    let cliente : ClienteViewModel = this.clienteForm.value;
    cliente.id = this.cliente.id;
    cliente.dataMod = new Date();
    this.clienteService.editarClientes(cliente)
    .then(() => this.handleSuccessEdit(cliente))
    .catch(err => console.error(err));
  }
}


handleSuccessSave(response: DocumentReference, cliente: Cliente){
this.activeModal.dismiss({cliente: cliente, id: response.id, modoInsercao: true});
}

handleSuccessEdit(cliente: ClienteViewModel){
  this.activeModal.dismiss({cliente: cliente, id: cliente.id, modoInsercao: false});
}
  


}
