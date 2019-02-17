import { combineReducers } from 'redux'
import reducer from '../spotifood/reducer'

const rootReducer = combineReducers({
	spotifood: reducer
});

export default rootReducer;