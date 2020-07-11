import { Injectable } from '@angular/core';
import { AngularFirestore,  DocumentReference } from '../../../../node_modules/@angular/fire/firestore';
import { Observable } from '../../../../node_modules/rxjs';
import { FirebaseApp } from '../../../../node_modules/@angular/fire';
import { Cliente } from '../models/cliente';
import { ClienteViewModel } from '../models/cliente-view-model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private db: AngularFirestore) { }

  private clienteColection = 'clientes';

  getClientes(): Observable<firebase.firestore.QuerySnapshot>{
    return this.db.collection<Cliente>(this.clienteColection, ref => ref.orderBy('nome', 'asc')).get();
  }

  salvarClientes(cliente : Cliente): Promise<DocumentReference>{
    return this.db.collection(this.clienteColection).add(cliente);
  }

  editarClientes(cliente : ClienteViewModel): Promise<void>{
    return this.db.collection(this.clienteColection).doc(cliente.id).update(cliente);
  }

  editarClientesParcial(id : string, obj: Object): Promise<void>{
    return this.db.collection(this.clienteColection).doc(id).update(obj);
  }

 
  deletarClientes(id : string): Promise<void>{
    return this.db.collection(this.clienteColection).doc(id).delete();
  }

}
