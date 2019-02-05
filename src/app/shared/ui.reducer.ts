import * as fromUI from './ui.accions';


export interface State {
    isLoading: boolean;
}

// Estado inicial:
const initState: State = {
  isLoading: false
};

// Reducer:
export function uiReducer (state= initState, action: fromUI.acciones ): State {

    switch (action.type) {

    case fromUI.ACTIVAR_LOADING:
         return {isLoading: true};

    case fromUI.DESACTIVAR_LOADING:
         return {isLoading: false};

    default:
        return state;
    }

}
