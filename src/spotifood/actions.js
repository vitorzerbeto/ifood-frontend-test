import axios from 'axios'
import { LOAD_FILTER_FIELDS, LOAD_PLAYLISTS, REFRESH_TOKEN, TOGGLE_LOADING } from '../main/actionTypes'

export const toggleLoading = (show = false) => ({type: TOGGLE_LOADING, payload: show});

export const loadFilterFields = () => {
	toggleLoading(true);
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
			})
			.then((resp) => dispatch(toggleLoading()));
	}
};

export const refreshToken = (expired = false) => {
	if(!expired && localStorage.getItem('token') !== null) {
		return [
			{type: REFRESH_TOKEN, payload: localStorage.getItem('token')},
			search()
		];
	}
	toggleLoading(true);
	return dispatch => {
		axios.post(process.env.REACT_APP_API_URL_TOKEN, {
			auth: process.env.REACT_APP_API_BASE64,
		})
		.then(resp => {
			localStorage.setItem('token', resp.data.access_token);
			dispatch({type: REFRESH_TOKEN, payload: resp.data.access_token})
		})
		.then(resp => dispatch(search()))
		.then((resp) => dispatch(toggleLoading()));
	}
};

export const search = (filter = "") => {
	const URL = filter === "" ? process.env.REACT_APP_API_URL_PLAYLISTS : `${process.env.REACT_APP_API_URL_PLAYLISTS}?${filter}`;

	toggleLoading(true);
	return (dispatch, getState) => {
		axios.get(URL, { headers: { "Authorization": `Bearer ${getState().spotifood.token}` } })
			.then((resp) => {
				const list =  resp.data.playlists.items.map(el => {
					return {
						image: el.images[0].url,
						name: el.name,
						owner: el.owner.display_name,
						tracks: el.tracks.total,
						url: el.external_urls.spotify
					}
				});
				localStorage.setItem('playlists', JSON.stringify(resp.data));
				return dispatch({
					type: LOAD_PLAYLISTS,
					payload: list
				})
			})
			.catch(error => {
				const status = error.response.status;
				const message = error.response.data.error.message;

				if(status === 400) {
					if (message === "Unlaunched country") {
						alert("Nenhuma playlist para o país selecionado!");
						document.getElementById('fFilter').reset();
					}
					return dispatch(refreshToken(true))
				} else {

				}
			})
			.then((resp) => dispatch(toggleLoading()));
	}
};