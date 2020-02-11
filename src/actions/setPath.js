const setPath =(params)=>{
  return (dispatch)=>{
    dispatch({type:'setPath',payload:params})
  }
}

export {setPath};