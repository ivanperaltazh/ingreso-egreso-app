export class IngresoEgreso {

  descripcion: string;
  monto: number;
  tipo: string;
  uid?: string;

  constructor (obj) {
    this.descripcion = obj && obj.descripcion || null; // Si existe el objeto y este tienedescripcion poner esta sino poner nulo
    this.monto = obj && obj.monto || null;
    this.tipo = obj && obj.tipo || null;
    // this.uid = obj && obj.uid || null;
  }

}
