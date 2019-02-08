import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  // Para evitar fugas de memoria y manejar el unsubscribe() cuando cierre sesion
  ingresoEgresoListerSubcription: Subscription = new Subscription();
  ingresoEgresoItemsSubcription: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore,
              private authService: AuthService,
              private sotore: Store<AppState>) { }


  initIngresoEgresoListener() {

this.ingresoEgresoListerSubcription =  this.sotore.select('auth')
      .pipe(
        filter( auth => auth.user != null) // pasa el filtro solo si el usuario no es null
      )
      .subscribe( auth =>
        this.ingresoEgresoItems(auth.user.uid)
        );
  }



  private ingresoEgresoItems(uid: string) {

   this.ingresoEgresoItemsSubcription =  this.afDB.collection(`${uid}/ingresos-egresos/items`)
           .snapshotChanges()
           .pipe(
              map( docData => {
              return docData.map(doc => {
                 return {
                  ...doc.payload.doc.data(),
                     uid: doc.payload.doc.id
                  };
                });
               } )
           )
           .subscribe ((coleccion: any[]) => {
             this.sotore.dispatch(new SetItemsAction(coleccion));
           // console.log(coleccion);
           });
  }



  cancelarSubscriptions() {
    this.ingresoEgresoListerSubcription.unsubscribe();
    this.ingresoEgresoItemsSubcription.unsubscribe();
    this.sotore.dispatch(new UnsetItemsAction());
  }



  crearIngresoEgreso (ingresoEgreso: IngresoEgreso) {

    const user = this.authService.getUsuario();

   return this.afDB.doc(`${user.uid}/ingresos-egresos`)
        .collection('items').add({...ingresoEgreso}); // con ... spread extraigo pares clave valor que es lo q requiere firebase
  }


  borrarIngresoEgreso(uid: string) {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete();
  }


}


