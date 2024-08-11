/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }
}*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductos } from '../Interfaces/iproductos';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  [x: string]: any;
  apiurl =
    'http://localhost/My_proyect/Sexto/Proyectos/03MVC/controllers/productos.controller.php?op=';

  constructor(private lector: HttpClient) {} 

  todos(): Observable<IProductos[]> {   
    return this.lector.get<IProductos[]>(this.apiurl + 'todos');
  }
  eliminar(idProducto: number): Observable<number> {
    const formData = new FormData();
    formData.append('idProductos', idProducto.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  uno(id: number): Observable<IProductos> {
    const url = `${this.apiurl}uno&idProductos=${id}`;
    console.log("URL construida:", url);
    return this.lector.get<IProductos>(url);
  }
  
  insertar(producto: IProductos): Observable<any> {
    const formData = new FormData();
    formData.append('Codigo_Barras', producto.Codigo_Barras);
    formData.append('Nombre_Producto', producto.Nombre_Producto);
    formData.append('Graba_IVA', producto.Graba_IVA.toString());
    return this.lector.post<any>(this.apiurl + 'insertar', formData);
  }

  actualizar(producto: IProductos): Observable<any> {
    const formData = new FormData();
    formData.append('idProductos', producto.idProductos.toString());
    formData.append('Codigo_Barras', producto.Codigo_Barras);
    formData.append('Nombre_Producto', producto.Nombre_Producto);
    formData.append('Graba_IVA', producto.Graba_IVA.toString());
    return this.lector.post<any>(this.apiurl + 'actualizar', formData);
  }

}

