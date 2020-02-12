import React, { Component } from 'react';
// import styles from './index.module.css';
import {
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { setPath, getItem, setItem } from '../../actions';

class MyPokemon extends Component {
  constructor() {
    super();
    this.onRelease = this.onRelease.bind(this)
  }

  componentDidMount() {
    const { setPath, match, getItem } = this.props;
    setPath(match);
    getItem('myPokemon');
  }

  onRelease(pokemon, nickname) {
    const { myPokemon, setItem, getItem } = this.props
    var _myPokemon = myPokemon ? myPokemon : "";

    if (_myPokemon[pokemon].list.length == 1) {
      delete _myPokemon[pokemon]
    } else {
      _myPokemon[pokemon].list.splice(nickname, 1)
    }
    setItem({ target: 'myPokemon', data: _myPokemon })
    getItem('myPokemon');
  }

  render() {
    const { myPokemon } = this.props
    const { onRelease } = this
    var temp = []
    for (let i in myPokemon) {
      temp.push(<div key={i}>
        <Link to={`/pokemon/${i}`}>{myPokemon[i].name}</Link>
        {myPokemon[i].list.map((item, index) => {
          return <div key={index}>{item.nickname}<button onClick={() => onRelease(i, index)}>Release</button></div>
        })}
      </div>)
    }

    return (
      <div >
        My Pokemon
      {temp}
      </div>
    );
  }

}
const mapStateToProp = (state) => {
  const { myPokemon } = state
  return { myPokemon }
}
export default connect(mapStateToProp, { setPath, getItem, setItem })(MyPokemon);
