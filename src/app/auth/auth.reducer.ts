import * as fromAuth from './auth.actions';
import { User } from './login/user.model';



export interface AuthState {
    user: User;
}


const estadoInicial: AuthState = {
    user: null
};

export function authReducer (state = estadoInicial, action: fromAuth.acciones): AuthState {

    switch (action.type) {

      case fromAuth.SET_USER:
           return {
               user: { ... action.user}  // Rompe referencia de objetos e javascript
           };

       case fromAuth.UNSET_USER:
           return {
               user: null
           };


    default:
        return state;

    }

}
