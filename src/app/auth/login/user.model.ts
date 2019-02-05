export class User {
  public nombre: string;
  public email: string;
  public uid: string;

  constructor(obj: DataObj) {
    this.nombre = obj && obj.nombre || null;  // si existe el obj tomo el obj.nombre o sino pone null
    this.email =  obj && obj.email || null;
    this.uid =    obj && obj.uid || null;
  }

  }


  interface DataObj {
       uid: string;
     email: string;
    nombre: string;
  }



// export class User {
// public nombre: string;
// public email: string;
// public uid: string;

// constructor(nombre: string, email: string, uid: string) {
//   this.nombre = nombre;
//   this.email = email;
//   this.uid = uid;
// }

// }


// O tambien se puede escribir asi:

// export const User = {
//     nombre: '',
//     email: '',
//     uid: ''
//   };



//  O tambien se puede escribir asi:

// export class User {
//   constructor(public nombre: string, public email: string, public uid: string) {}
//   }
