const defaultState = { path: "", url: "", params: {} };
export default (state = defaultState, action) => {
  var _type    = action && action.type    ? action.type    : '';
  var _payload = action && action.payload ? action.payload : '';
  var _result  = ''
  switch (_type) {
    case "setPath":_result= _payload;
    break;
    default: _result= state;
  }
  return _result
}