import React, { Component } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setPath, getItem } from "../../actions";
import urlSlice from "../../helper/urlSlice";
import urlSliceDetail from "../../helper/urlSliceDetail";
import { Titlebar } from "../../components";

const {
  link_list,
  content_list,
  container,
  prev_next_button,
  prev_button,
  next_button
} = styles;
class MyPokemon extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      dataStatus: 102
    };
    this.getData = this.getData.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
  }

  componentDidMount() {
    const { setPath, match, getItem } = this.props;
    const { getData } = this;
    setPath(match);
    getItem("myPokemon");
    getData();
  }

  componentDidUpdate(prevProps) {
    const { getData } = this;
    if (prevProps.match.url !== this.props.match.url) {
      this.setState({ dataStatus: 102 }, getData());
    }
  }
  getData() {
    const { POKEMON_URL } = process.env;
    const { match } = this.props;
    var timestamp = new Date().getTime();
    var _off_set =
      match && match.params && match.params.offset
        ? `?offset=${match.params.offset}&limit=20&t=${timestamp}`
        : `?t=${timestamp}`;
    fetch(`${POKEMON_URL}${_off_set}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw { status: res.status, message: res.statusText };
        }
      })
      .then(result => {
        var count = result && result.count ? result.count : 0;
        var next = result && result.next ? result.next : "";
        var previous = result && result.previous ? result.previous : "";
        var results = result && result.results ? result.results : [];
        this.setState({
          data: { count, next, previous, results },
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

  disabledButton(event) {
    const { dataStatus } = this.state;
    dataStatus !== 200 && event.preventDefault();
  }

  render() {
    const { data, dataStatus } = this.state;
    const { myPokemon } = this.props;
    const { disabledButton } = this;
    const { count, next, previous, results } = data;

    var _next = next ? urlSlice(next) : "";
    var _previous = previous ? urlSlice(previous) : "";
    var _next_offset = _next && _next.offset ? _next.offset : "";
    var _previous_offset =
      _previous && _previous.offset ? _previous.offset : "";
    return (
      <div className={container}>
        <Titlebar title={"Pokemon List"} />
        {data && dataStatus == 200 && results ? (
          <div className={content_list}>
            {results.map((item, index) => {
              var _number = item && item.url ? urlSliceDetail(item.url) : "";
              var _owned =
                myPokemon && myPokemon[_number]
                  ? `(has ${myPokemon[_number].list.length})`
                  : "";
              return (
                <Link
                  key={index}
                  to={`/pokemon/${_number}`}
                  className={link_list}
                >
                  {" "}
                  {item.name} {_owned}{" "}
                </Link>
              );
            })}
          </div>
        ) : (
          <div>Waiting</div>
        )}
        <div className={prev_next_button}>
          {previous ? (
            <Link
              to={`/pokemons/${_previous_offset}`}
              onClick={disabledButton}
              className={prev_button}
            >
              {"<<"}prev
            </Link>
          ) : (
            ""
          )}
          {next ? (
            <Link
              to={`/pokemons/${_next_offset}`}
              onClick={disabledButton}
              className={next_button}
            >
              next{">>"}
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProp = state => {
  const { myPokemon } = state;
  return { myPokemon };
};
export default connect(mapStateToProp, { setPath, getItem })(MyPokemon);
