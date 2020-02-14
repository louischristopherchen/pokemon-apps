import React, { Component } from "react";
// import styles from './index.module.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setPath, getItem, setItem } from "../../actions";
import { Titlebar } from "../../components";

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

  onRelease(pokemon, nickname) {
    const { myPokemon, setItem, getItem } = this.props;
    var _myPokemon = myPokemon ? myPokemon : "";

    if (_myPokemon[pokemon].list.length == 1) {
      delete _myPokemon[pokemon];
    } else {
      _myPokemon[pokemon].list.splice(nickname, 1);
    }
    setItem({ target: "myPokemon", data: _myPokemon });
    getItem("myPokemon");
  }

  render() {
    const { myPokemon } = this.props;
    const { onRelease } = this;
    var temp = [];
    for (let i in myPokemon) {
      temp.push(

        <tbody key={i}>
          <tr>
            <td ><Link to={`/pokemon/${i}`}>{myPokemon[i].name}</Link></td>
            <td>
              <table style={{ width: '100%' }}>
                <tbody>
                  {myPokemon[i].list.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td >
                          {item.nickname}
                          <button style={{ float: 'right' }} onClick={() => onRelease(i, index)}>Release</button>
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
      <div>
        <Titlebar title={"My Pokemon"} />
        <table border="1">
          {temp}
        </table>
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
