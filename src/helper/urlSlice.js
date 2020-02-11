import queryString from 'query-string';
export default function urlSlice(params) {
  var _return = params.replace(/https\:\/\/pokeapi\.co\/api\/v2\/pokemon/g, '');
  _return = queryString.parse(_return);
  return _return;
}
