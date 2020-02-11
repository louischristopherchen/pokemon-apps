export default function urlSlice(params) {
  var _return = params.replace(/https\:\/\/pokeapi\.co\/api\/v2\/pokemon/g, '');
  _return = _return.replace(/\//g,'')
  return _return;
}
