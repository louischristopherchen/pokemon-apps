const defaultState = {};
export default (state = defaultState, action) => {
  var _type = action && action.type ? action.type : '';
  var _payload = action && action.payload ? action.payload : '';
  var _result = ''
  switch (_type) {
    case "getItem": _result = _payload;
      break;
    case "getItemNull": _result = state;
      break;
    case "setItem"  :_result = _payload
    default: _result = state;
  }
  return _result
}