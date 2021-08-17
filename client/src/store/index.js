import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer/index';
import thunk from 'redux-thunk';
//primero seteamos el store
//haciendo nuestro reducer(anda a ../reducer/index.js)


export const store = createStore(
  rootReducer, applyMiddleware(thunk)
  );

//ahora tenemos que hacer nuestra primer action!
//vamos a actions


export default store;