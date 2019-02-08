import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit , OnDestroy {

  nombre: string;

  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>,
              public ingresoEgresoService: IngresoEgresoService,
              private authservice: AuthService) { }

  ngOnInit() {

    this.subscription = this.store.select('auth')
    .pipe(
         filter(auth => auth.user != null)
        )
    .subscribe( auth => this.nombre = auth.user.nombre);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authservice.logout();
    this.ingresoEgresoService.cancelarSubscriptions();
  }

}
