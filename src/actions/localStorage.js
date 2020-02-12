const getItem = (params) => {
  return (dispatch) => {
    var myPokemon = JSON.parse(localStorage.getItem(params))
    if (myPokemon) {
      dispatch({ type: 'getItem', payload: myPokemon })
    } else {
      dispatch({ type: 'getItemNull', payload: myPokemon })
    }
  }
}

const setItem = (params) => {
  return (dispatch) => {
    var myPokemon = localStorage.setItem(params.target, JSON.stringify(params.data));
    dispatch({ type: 'setItem', payload: myPokemon })
  }
}

export { getItem,setItem };