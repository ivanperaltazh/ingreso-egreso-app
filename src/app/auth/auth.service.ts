import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
//import * as from 'firebase';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from './login/user.model';


@Injectable({
  providedIn: 'root'
  // al tener  el  providedIn: 'root', ahora no se hace falya importar en el module ya q con esto esta global, si se quiere
   //  se puede borrar esto e importar en el modulo
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore) { }

  initAuthListener() {  // Esto solo se debe llamar una solo vez en toda la aaplicacion por lo que se coloca en el app.componet.ts
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }


  crearUsuario(nombre: string, email: string, password: string) {

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(resp => {
     //  console.log(resp);
      const user: User = {
        uid: resp.user.uid,
        nombre: nombre,
        email: resp.user.email
      };

      this.afDB.doc(`${user.uid}/usuario`)
      .set(user)
      .then ( () => {
        this.router.navigate(['/']);
      });

    })
    .catch( error => {
      console.error(error);

      Swal.fire({
        title: 'Error en el login',
        text: error.message,
        type: 'error',
        confirmButtonText: 'Ok'
      });

    });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(resp => {
     // console.log(resp);
      this.router.navigate(['/']);
    })
    .catch( error => {
      console.error(error);

      Swal.fire({
        title: 'Error en el login',
        text: error.message,
        type: 'error',
        confirmButtonText: 'Ok'
      });

    });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }


  isAuth() {
   return this.afAuth.authState
   .pipe(
     map(fbUser => {
       if (fbUser == null) {
        this.router.navigate(['/login']);
       }
       return fbUser != null;
     }) // retorna true o false segun sies o no null
   );
  }

}
