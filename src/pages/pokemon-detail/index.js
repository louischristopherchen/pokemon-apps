import React, { Component } from 'react';
// import styles from './index.module.css';
import {
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { setPath } from '../../actions';
import urlSlice from '../../helper/urlSlice';

class MyPokemon extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      dataStatus: 102
    }
    this.getData = this.getData.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
  }

  componentDidMount() {
    const { setPath, match } = this.props
    const { getData } = this
    setPath(match);
    getData();
  }
  componentDidUpdate(prevProps) {
    const { getData } = this
    if (prevProps.match.url !== this.props.match.url) {
      this.setState({ dataStatus: 102 }, getData());
    }
  }

  getData() {
    const { POKEMON_URL } = process.env;
    const { match } = this.props
    var timestamp = new Date().getTime();
    var _number = match && match.params && match.params.number ? `/${match.params.number}?t=${timestamp}` : `?t=${timestamp}`;
    fetch(`${POKEMON_URL}${_number}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw { status: res.status, message: res.statusText };
        }
      })
      .then(result => {
        console.log(result)
        var name = result && result.name?result.name:'';
        var moves = result && result.moves?result.moves:[];
        var types = result && result.types?result.types:[];
        var sprites = result && result.sprites?result.sprites:'';
         this.setState({
          data: { name, moves, types, sprites }, dataStatus: 200
        })
        /*
        name
        moves[move{name,url},version_group_details{level_learned_at,move_learn_method{name,url},version_group{name,url}}]
        types[slot,type{name,url}]
        sprites{
        back_default
        back_female
        back_shiny
        back_shiny_female
        front_default
        front_default_female
        front_shiny
        front_shiny_female}
        */

      
       
      })
      .catch(err => {
        if (!err.status && err.message == 'Failed to fetch') {
          alert('check your connection')
        } else {
          alert(`status: ${err.status} & message: ${err.message}`)
        }
      })
  }

  disabledButton(event) {
    const { dataStatus } = this.state;
    dataStatus !== 200 && event.preventDefault()
  }

  render() {
    const { data, dataStatus } = this.state;
    const { disabledButton } = this
    const { name, moves, types, sprites } = data
     return (
      <div>
      Pokemon Detail
     {data && dataStatus == 200 ? (
     <div>
       <img src={sprites.front_default||sprites.front_default_female}/>
      <p style={{textTransform: 'capitalize'}}> {name}</p>

     </div>
     ) : (<div>Waiting</div>)}
        

      </div>
    );
    // }

  }

}


export default connect(null, { setPath })(MyPokemon);
