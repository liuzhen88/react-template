import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../Reducers";

let data = {
  user: {id: '', name: ''},
  codes: []
}

export default createStore (
  reducers,
  data,
  applyMiddleware(thunk)
)