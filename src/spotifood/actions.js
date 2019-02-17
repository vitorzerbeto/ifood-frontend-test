import axios from 'axios'
import { LOAD_FILTER_FIELDS, LOAD_PLAYLISTS, REFRESH_TOKEN } from '../main/actionTypes'

export const loadFilterFields = () => {
	return dispatch => {
		axios.get(process.env.REACT_APP_FIELDS_URL)
			.then((resp) => {
				localStorage.setItem('filter', JSON.stringify(resp.data));
				return dispatch({
					type: LOAD_FILTER_FIELDS,
					payload: resp.data.filters
				})
			})
			.catch((error) => {
				if(localStorage.getItem("filter") === null) {
					return dispatch({
						type: LOAD_FILTER_FIELDS,
						payload: JSON.parse(localStorage.getItem("filter"))
					});
				}
			});
	}
};

export const refreshToken = (expired = false) => {
	if(!expired && localStorage.getItem('token') !== null) {
		return [
			{type: REFRESH_TOKEN, payload: localStorage.getItem('token')},
			search()
		];
	}
	return dispatch => {
		axios.post(process.env.REACT_APP_API_URL_TOKEN, {
			auth: process.env.REACT_APP_API_BASE64,
		})
		.then(resp => {
			localStorage.setItem('token', resp.data.access_token);
			dispatch({type: REFRESH_TOKEN, payload: resp.data.access_token})
		})
		.then(resp => dispatch(search()))
	}
};

export const search = (filter = "") => {
	const URL = filter === "" ? process.env.REACT_APP_API_URL_PLAYLISTS : `${process.env.REACT_APP_API_URL_PLAYLISTS}?${filter}`;

	return (dispatch, getState) => {
		axios.get(URL, { headers: { "Authorization": `Bearer ${getState().spotifood.token}` } })
			.then((resp) => {
				const list =  resp.data.playlists.items.map(el => {
					return {
						image: el.images[0].url,
						name: el.name,
						owner: el.owner.display_name,
						tracks: el.tracks.total
					}
				});
				localStorage.setItem('playlists', JSON.stringify(resp.data));
				return dispatch({
					type: LOAD_PLAYLISTS,
					payload: list
				})
			})
			.catch(error => {
				console.log(error.response.data);
				if(error.response.status) {
					return dispatch(refreshToken(true))
				} else {

				}
			})
	}
};