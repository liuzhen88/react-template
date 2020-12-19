let codeReducer = (state='', action) => {
  switch(action.type) {
    
    case "updatePermission":
      return action.data;
    default: 
      return state;   
  }
}

export default codeReducer