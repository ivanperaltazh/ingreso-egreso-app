import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;  // Esto nos permitira llamar el nSubscribe() cuanod se destruya este componente

  constructor(public authService: AuthService,
              public store: Store <AppState>) { }

  ngOnInit() {
   this.subscription = this.store.select('ui')
    .subscribe (ui => this.cargando = ui.isLoading );
  }

  onSubmit( data: any) {
   //  console.log('Datos del formulario', data);
    this.authService.login(data.email, data.password);
 }


 ngOnDestroy() {
   // Aqui hacemos el unsubscribe(), porque el ngOnInit se esta llamando varias veces de este modo evitamos jugas de memoria
  this.subscription.unsubscribe();
 }

}
