import {combineReducers} from 'redux';
import pathConfig from './pathConfig';
import myPokemon  from './myPokemon';

export default combineReducers({
   pathConfig,
   myPokemon
});