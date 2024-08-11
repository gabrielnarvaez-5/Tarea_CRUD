/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor() { }
}
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICliente } from '../Interfaces/icliente';
import { IProductos } from '../Interfaces/iproductos';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  apiurl =
    'http://localhost/My_proyect/Sexto/Proyectos/03MVC/controllers/clientes.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<ICliente[]> {
    return this.lector.get<ICliente[]>(this.apiurl + 'todos');
  }
  eliminar(idCliente: number): Observable<number> {
    const formData = new FormData();
    formData.append('idClientes', idCliente.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  uno(id: number): Observable<ICliente> {
    const url = `${this.apiurl}uno&idClientes=${id}`;
    console.log("URL construida:", url);
    return this.lector.get<ICliente>(url);
  }

  insertar(cliente: ICliente): Observable<any> {
    const formData = new FormData();
    formData.append('Nombres', cliente.Nombres);
    formData.append('Direccion', cliente.Direccion);
    formData.append('Telefono', cliente.Telefono);
    formData.append('Cedula', cliente.Cedula);
    formData.append('Correo', cliente.Correo);
    return this.lector.post<any>(this.apiurl + 'insertar', formData);
  }

  actualizar(cliente: ICliente): Observable<any> {
    const formData = new FormData();
    formData.append('idClientes', cliente.idClientes.toString());
    formData.append('Nombres', cliente.Nombres);
    formData.append('Direccion', cliente.Direccion);
    formData.append('Telefono', cliente.Telefono);
    formData.append('Cedula', cliente.Cedula);
    formData.append('Correo', cliente.Correo);
    return this.lector.post<any>(this.apiurl + 'actualizar', formData);
  }
} 
/*


*/