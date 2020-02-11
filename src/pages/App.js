import React, { Component } from 'react';
import styles from './index.module.css';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import MyPokemon   from './my-pokemon';
import PokemonList from './pokemon-list';
import PokemonDetail from './pokemon-detail';
import { Navbar }  from '../components';
const { container } = styles;
class App extends Component {
  render() {
    return (
      <div className={container}>
        <Navbar/>
        <Switch>
          <Route exact path='/'>
            <Redirect to="/pokemons"/>
          </Route>
          <Route path="/pokemons/:offset?"    component={PokemonList} />
          <Route path="/pokemon/:number"      component={PokemonDetail} />
          <Route path="/my-pokemon/:id?"      component={MyPokemon} />
        </Switch>
        
       
      </div>
    );
  }
}

export default (App);
