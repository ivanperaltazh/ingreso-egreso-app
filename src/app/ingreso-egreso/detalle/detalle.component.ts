import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>,
              public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
  this.subscription =  this.store.select('ingresoEgreso')
         .subscribe(ingresoEgreso => {
          //  console.log(ingresoEgreso.items);
          this.items = ingresoEgreso.items;

         });
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();  // prevenismo errores de memoria al repetirse muchas veces la subscripcion
  }

  borrarItem(item: IngresoEgreso ) {
   this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
   .then ( () => {

    Swal.fire({
      title: 'Eliminado',
      text: item.descripcion,
      type: 'success',
      confirmButtonText: 'Ok'
    });

   }) .catch( error => {
    Swal.fire({
      title: 'Error ',
      text: error.message,
      type: 'error',
      confirmButtonText: 'Ok'
    });

  });
  }


}
