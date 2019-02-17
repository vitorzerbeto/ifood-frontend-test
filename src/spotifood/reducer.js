/**
 * Created by Vitor Zerbeto on 15/02/2019.
 */
import {LOAD_FILTER_FIELDS, LOAD_PLAYLISTS, REFRESH_TOKEN} from '../main/actionTypes'

const INITIAL_STATE = { filter: [], playlists: [], token: ''};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_FILTER_FIELDS:
			return {...state, filter: action.payload};
		case LOAD_PLAYLISTS:
			return {...state, playlists: action.payload};
		case REFRESH_TOKEN:
			return {...state, token: action.payload};
		default:
			return state
	}
}