import { combineReducers } from 'redux';
import user from './user';
import codes from "./codes";

export default combineReducers({
  user,
  codes
})