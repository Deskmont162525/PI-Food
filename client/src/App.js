import React, {Suspense} from 'react';
import {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Loadins from './components/lazyloadin';
import Nav from './components/nav';
import {useDispatch} from 'react-redux';
import {getFoods, getTypes} from './actions/index';
import './App.css';
const Buton =React.lazy(() => import ('./components/button'));
const Foods =React.lazy(() => import ('./components/foods'));
const FoodDetail =React.lazy(() => import ('./components/foodDetails'));
const FoodForm =React.lazy(() => import ('./components/foodForm'));


function App() {
  const dispatch = useDispatch()
  //obtengo las comidas
  useEffect(() => {
    dispatch (getFoods());    
  }, [dispatch]);

  //obtengo los typos
  useEffect(() => {
    dispatch (getTypes())
  }, [dispatch]);
  
 

  return (
    <BrowserRouter>      
      <div className="App"> 
      <Nav />
      <Route>
        <Suspense fallback={<Loadins />}>
          <Switch>
            <Route exact path="/" component={Buton}>          
            </Route>
          </Switch>
        </Suspense>
        
        <Suspense fallback={<Loadins />}>          
          <Switch>          
            <Route exact path="/recipe" component={Foods}>            
            </Route> 
          </Switch>
        </Suspense>
        <Suspense fallback={<Loadins />}>          
          <Switch>          
            <Route exact path="/recipe?Nombre" component={Foods}>            
            </Route> 
          </Switch>
        </Suspense>
        <Suspense fallback={<Loadins />}>
          <Switch>
          <Route exact path="/recipe/:idReceta" component={FoodDetail}>            
          </Route>
          </Switch>
        </Suspense> 
          <Suspense fallback={<Loadins />}>
          <Switch> 
          <Route exact path="/form/insert" component={FoodForm}>
          </Route> 
          </Switch>
        </Suspense>
      </Route>
      </div>
    </BrowserRouter>   
    
  );
}

export default App;
