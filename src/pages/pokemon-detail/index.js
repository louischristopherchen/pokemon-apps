import React, { Component } from "react";
import { connect } from "react-redux";
import { setPath, getItem, setItem } from "../../actions";
import styles from "./index.module.css";
import { Titlebar, Modal } from "../../components";

const {
  top_content,
  top_right_content,
  type_content,
  type_item,
  back_button,
  catch_button,
  container,
  content,
  move_list,
  move_content,
  move_item,
  pokemon_name,
  pokemon_image,
  pokemon_moves,m_5_0
} = styles;
class MyPokemon extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      dataStatus: 102,
      modalPopUp: false,
      nickname: "",
      myPokemon: ""
    };
    this.getData = this.getData.bind(this);
    this.catchPokemon = this.catchPokemon.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const { setPath, match, getItem } = this.props;
    const { getData } = this;
    setPath(match);
    getData();
    getItem("myPokemon");
  }

  componentDidUpdate(prevProps) {
    const { getData } = this;
    if (prevProps.match.url !== this.props.match.url) {
      this.setState({ dataStatus: 102 }, getData());
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  getData() {
    const { POKEMON_URL } = process.env;
    const { match } = this.props;
    var timestamp = new Date().getTime();
    var _number =
      match && match.params && match.params.number
        ? `/${match.params.number}?t=${timestamp}`
        : `?t=${timestamp}`;
    fetch(`${POKEMON_URL}${_number}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw { status: res.status, message: res.statusText };
        }
      })
      .then(result => {
        var name = result && result.name ? result.name : "";
        var moves = result && result.moves ? result.moves : [];
        var types = result && result.types ? result.types : [];
        var sprites = result && result.sprites ? result.sprites : "";
        this.setState({
          data: { name, moves, types, sprites },
          dataStatus: 200
        });
      })
      .catch(err => {
        if (!err.status && err.message == "Failed to fetch") {
          alert("check your connection");
        } else {
          alert(`status: ${err.status} & message: ${err.message}`);
        }
      });
  }

  catchPokemon() {
    var chance = Math.floor(Math.random() * 2 + 1) - 1;
    if (chance) {
      this.setState({ modalPopUp: true });
    }
  }

  onCloseModal() {
    this.setState({ modalPopUp: false });
  }

  onSave() {
    const { nickname, data } = this.state;
    const { match, myPokemon, setItem } = this.props;
    var _number =
      match && match.params && match.params.number ? match.params.number : "";
    var _name = data && data.name ? data.name : "";
    var _myPokemon = myPokemon ? myPokemon : {};
    if (!_myPokemon[_number]) {
      _myPokemon[_number] = {};
      _myPokemon[_number].list = [];
      _myPokemon[_number].name = _name;
      _myPokemon[_number].list.push({ nickname });
    } else {
      _myPokemon[_number].list.push({ nickname });
    }
    this.setState(
      { nickname: "", modalPopUp: false },
      setItem({ target: "myPokemon", data: _myPokemon }),
      getItem("myPokemon")
    );
  }

  onChangeValue(value, target) {
    this.setState({ [target]: value });
  }

  render() {
    const { data, dataStatus, modalPopUp, nickname } = this.state;
    const { catchPokemon, onCloseModal, onSave, onChangeValue, goBack } = this;
    const { name, moves, types, sprites } = data;
    return (
      <div className={container}>
        <Titlebar title={"Pokemon Detail"} />
        <button onClick={goBack} className={back_button}>
          Go Back
        </button>

        {data && dataStatus == 200 ? (
          <div className={content}>
            <div className={top_content}>
              <div  >
                <img className={pokemon_image} 
                  src={sprites.front_default || sprites.front_default_female}
                />
              </div>
              <div className={top_right_content}>
                <div className={type_content}>
                  {types.map((item, index) => {
                    return <div className={type_item} key={index}>{item.type.name}</div>;
                  })}
                </div>
                <div className={pokemon_name}>
                  {name}
                </div>
                <div>
                  <button onClick={catchPokemon} className={catch_button} >CATCH</button>
                </div>
              </div>
            </div>
            <div className={pokemon_moves}>
              Moves :
            </div>
            <div className={move_content}>
              <div className={move_list}>
                {moves.map((item, index) => {
                  return (
                    <div className={move_item} key={index}>
                      {item.move.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
            <div>Please Wait...</div>
          )}
        <Modal isOpen={modalPopUp} onCloseModal={onCloseModal}>
          <h1>Congrats!!!</h1>
          <input
            className={m_5_0}
            type="text"
            placeholder={"Give Your Pokemon Nickname"}
            onChange={event => {
              onChangeValue(event.target.value, "nickname");
            }}
            value={nickname}
          />
          <button onClick={onSave}>Save</button>
        </Modal>

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
