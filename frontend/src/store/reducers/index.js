import { combineReducers  } from "redux";
import repositoryReducer from './fetchReducer';

const reducers = combineReducers({
    fetch: repositoryReducer,
})

export default reducers;