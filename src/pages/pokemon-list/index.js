import React, { Component } from 'react';
// import styles from './index.module.css';
import {
  // Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { setPath } from '../../actions';
class MyPokemon extends Component {
  componentDidMount() {
    const {setPath,match} = this.props
    setPath(match)
  }
  render() {
    return (
      <div >
       Pokemon List
      </div>
    );
  }

}


export default connect(null, { setPath })(MyPokemon);
