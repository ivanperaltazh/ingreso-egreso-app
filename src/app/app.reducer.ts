
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';
import { ActionReducerMap } from '@ngrx/store';

// Datos para el STORE ( STATES y REDUCRES, se pasan en el modulo)

// Archivo global que tiene toda la deficinion del estado de app:
// STATES:
export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}

// REDUCERS:
// Configuracion global de los reducers:
// El ActionReducerMap permite fusionar varios reducer en uno solo. De este modo la app conocera como estan cada una de las partes
//   que tendra el store:

export const appReducers: ActionReducerMap<AppState> = {
     ui: fromUI.uiReducer,
     auth: fromAuth.authReducer,
     ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
};


