import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProveedorService } from './Services/proveedor.service';
import { ClientesService } from './Services/clientes.service';
import { ProductosService } from './Services/productos.service';
import { Iproveedor } from './Interfaces/iproveedor';
import { ICliente } from './Interfaces/icliente';
import { IProductos } from './Interfaces/iproductos';


//import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Lista de Proveedores';

  listaProveedores: Iproveedor[] = [];
  listaClientes: ICliente[] = [];
  listaProductos: IProductos[] = []; 
  proveedorEncontrado: Iproveedor | null = null;
  clienteEncontrado: ICliente | null = null;
  productoEncontrado: IProductos| null = null;

  //Constructor

  constructor(private ServicioProveedor: ProveedorService,
              private ServicioCliente: ClientesService,
              private ServicioProducto: ProductosService,

  ) {}
  ngOnInit() {

    this.cargatabla();
    this.cargarClientes();
    this.cargarProductos();
    const initialId = '123'; // ID inicial
    this.buscarProductoPorId(initialId);
    this.buscarProductoPorId(initialId);
  }


  //Proveedor 
  cargatabla() {
    this.ServicioProveedor.todos().subscribe((data) => {
      this.listaProveedores = data;
    });
  }
  eliminar(idProveedor: number) {
    this.ServicioProveedor.eliminar(idProveedor).subscribe((data) => {
      console.log(data);
      this.cargatabla();
    });
  }

  actualizarProveedor(id: number, nombreEmpresa: string, direccion: string, telefono: string, contactoEmpresa: string, telefonoContacto: string) {
    const proveedor: Iproveedor = {
      idProveedores: id,
      Nombre_Empresa: nombreEmpresa,
      Direccion: direccion,
      Telefono: telefono,
      Contacto_Empresa: contactoEmpresa,
      Teleofno_Contacto: telefonoContacto
    };

    this.ServicioProveedor.actualizar(proveedor).subscribe({
      next: (response) => {
        console.log('Proveedor actualizado:', response);
        alert('Proveedor actualizado exitosamente');
      },
      error: (error) => {
        alert('Error al actualizar proveedor');
        console.error('Error al actualizar proveedor:', error);
      }
    });
  } 

  verDescripcionProv(event: Event, proveedor: Iproveedor) {
    const input = event.target as HTMLInputElement;
    proveedor.Teleofno_Contacto = input.value;
  }

  
  //Clientes
  cargarClientes() {
    this.ServicioCliente.todos().subscribe((data) => {
      this.listaClientes = data;
    });
  }

  eliminarCliente(idCliente: number) {
    this.ServicioCliente.eliminar(idCliente).subscribe((data) => {
      console.log(data);
      this.cargarClientes();
    });
  }

  buscarClientesPorId(id: string) {
    const idNumber = Number(id); // Convertir el ID de string a número
    if (isNaN(idNumber)) {
      console.error('ID no válido');
      return;
    }
    this.ServicioCliente.uno(idNumber).subscribe({
      next: (data) => {
        console.log("Producto encontrado:", data);
        this.clienteEncontrado = data; 
      },
      error: (error) => {
        console.error("Error al buscar producto:", error);
      }
    });
  }

  insertarClientes(nombres: string, direccion: string, telefono: string, cedula: string, correo: string) {
    const nuevoCliente: ICliente = {
      idClientes: -1, // Asignar un valor 
      Nombres: nombres,
      Direccion: direccion,
      Telefono: telefono, 
      Cedula: cedula,
      Correo: correo
    };

    this.ServicioCliente.insertar(nuevoCliente).subscribe({
      next: (response) => {
        console.log('Cliente ingresado:', response);
        alert('Cliente ingresado exitosamente');
      },
      error: (error) => {
        console.error('Error al ingresar cliente:', error);
      }
    });
  }

  actualizarCliente(id: number, nombres: string, direccion: string, telefono: string, cedula: string, correo: string) {
    const cliente: ICliente = {
      idClientes: id,
      Nombres: nombres,
      Direccion: direccion,
      Telefono: telefono,
      Cedula: cedula,
      Correo: correo
    };

    this.ServicioCliente.actualizar(cliente).subscribe({
      next: (response) => {
        console.log('Cliente actualizado:', response);
        alert('Cliente actualizado exitosamente');
      },
      error: (error) => {
        alert('Error al actualizar cliente');
        console.error('Error al actualizar cliente:', error);
      }
    });
  }

  //actualizar cliente 
  verDescripcionCli(event: Event, cliente: ICliente) {
    const input = event.target as HTMLInputElement;
    cliente.Correo = input.value;
  }

  //Productos
  cargarProductos() {
    this.ServicioProducto.todos().subscribe((data) => {
      this.listaProductos = data;
    });
  }

  eliminarProducto(idProducto: number) {
    this.ServicioProducto.eliminar(idProducto).subscribe((data) => {
      console.log(data);
      this.cargarProductos();
    });
  }
  
  buscarProductoPorId(id: string) {
    const idNumber = Number(id); // Convertir el ID de string a número
    if (isNaN(idNumber)) {
      console.error('ID no válido');
      return;
    }
    this.ServicioProducto.uno(idNumber).subscribe({
      next: (data) => {
        console.log("Producto encontrado:", data);
        this.productoEncontrado = data; 
      },
      error: (error) => {
        console.error("Error al buscar producto:", error);
      }
    });
  }

  insertarProducto(codigoBarras: string, nombreProducto: string, grabaIVA: string) {
    const nuevoProducto: IProductos = {
      idProductos: -1, // Asignar un valor 
      Codigo_Barras: codigoBarras,
      Nombre_Producto: nombreProducto,
      Graba_IVA: Number(grabaIVA) // Convertir el valor a número
    };

    this.ServicioProducto.insertar(nuevoProducto).subscribe({
      next: (response) => {
        console.log('Producto insertado:', response);
        alert('producto ingresado exitosamente');
      },
      error: (error) => {
        console.error('Error al insertar el producto:', error);
      }
    });
  }

  actualizarProducto(id: number, codigoBarras: string, nombreProducto: string, grabaIVA: number) {
    const producto: IProductos = {
      idProductos: id,
      Codigo_Barras: codigoBarras,
      Nombre_Producto: nombreProducto,
      Graba_IVA: grabaIVA
    };

    this.ServicioProducto.actualizar(producto).subscribe({
      next: (response) => {
        console.log('Producto actualizado:', response);
        alert('Producto actualizado exitosamente');
      },
      error: (error) => {
        alert('Error al actualizar producto');
        console.error('Error al actualizar producto:', error);
      }
    });
  }

  verDescripcion(event: Event, producto: IProductos) {
    const input = event.target as HTMLInputElement;
    producto.Nombre_Producto = input.value;
  }
}
