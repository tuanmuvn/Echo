import axios from 'axios';
import * as types from '../constant/action_constant';

export function clearAlbums() {
  return {
    type: types.CLEAR_ALBUMS,
  };
}

export function setNumberOfPages(numberOfPages) {
  return {
    type: types.SET_NUMBER_OF_PAGES,
    numberOfPages,
  };
}

export function chagePageChunkIndex(pageChunkIndex) {
  return {
    type: types.CHANGE_PAGE_CHUNK_INDEX,
    pageChunkIndex,
  };
}

export function fetchDefaultAlbums() {
  return dispatch => {
    axios.get('/api/media/album/default')
      .then(({ data }) => {
        if (data.result && data.origins.length) {
          dispatch({ type: types.FETCH_DEFAULT_ALBUMS, defaultAlbums: data.origins });

          dispatch(clearAlbums()); // clear the albums data
        }
      })
      .catch(err => {
        throw err;
      });
  };
}

export function fetchAlbums(title, id, page) {
  const pageQuery = page ? `&page=${page}` : '';
  return dispatch => {
    axios.get(`/api/media/album?title=${title}&id=${id}${pageQuery}`)
      .then(({ data }) => {
        if (data.albums && data.albums.length) {
          dispatch({ type: types.FETCH_ALBUMS, albums: data.albums });

          dispatch(setNumberOfPages(data.numberOfPages));
        }
      })
      .catch(err => { throw err; });
  };
}
