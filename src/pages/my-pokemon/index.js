import React, { Component } from "react";
import styles from './index.module.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setPath, getItem, setItem } from "../../actions";
import { Titlebar } from "../../components";

const { table_outside, table_content, table_inside, container, release_pokemon, pokemon_name } = styles
class MyPokemon extends Component {
  constructor() {
    super();
    this.onRelease = this.onRelease.bind(this);
  }

  componentDidMount() {
    const { setPath, match, getItem } = this.props;
    setPath(match);
    getItem("myPokemon");
  }

  onRelease(pokemon, index_nickname,nickname) {
    var _confirm = confirm(`Are you sure release ${nickname}?`);
    if (_confirm) {
      const { myPokemon, setItem, getItem } = this.props;
      var _myPokemon = myPokemon ? myPokemon : "";

      if (_myPokemon[pokemon].list.length == 1) {
        delete _myPokemon[pokemon];
      } else {
        _myPokemon[pokemon].list.splice(index_nickname, 1);
      }
      setItem({ target: "myPokemon", data: _myPokemon });
      getItem("myPokemon");
    }
  }

  render() {
    const { myPokemon } = this.props;
    const { onRelease } = this;
    var temp = [];
    for (let i in myPokemon) {
      temp.push(
        <tbody key={i} className={table_content}>
          <tr>
            <td  ><Link to={`/pokemon/${i}`} className={pokemon_name}>{myPokemon[i].name}</Link></td>
            <td>
              <table className={table_inside}>
                <tbody>
                  {myPokemon[i].list.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td >
                          {item.nickname}
                          <button className={release_pokemon} onClick={() => onRelease(i, index,item.nickname)}>X</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </td>
          </tr>

        </tbody>

        // </div>
      );
    }

    return (
      <div className={container}>
        <Titlebar title={"My Pokemon"} />
        {temp.length!==0?<table className={table_outside}>
          <thead>
            <tr>
              <td> Pokemon</td>
              <td> Nickname</td>
            </tr>
          </thead>
          {temp}
        </table>:'You Dont Have Pokemon List in Your Pocket, Go Catch Pokemon'}
      </div>
    );
  }
}
const mapStateToProp = state => {
  const { myPokemon } = state;
  return { myPokemon };
};
export default connect(mapStateToProp, { setPath, getItem, setItem })(
  MyPokemon
);
