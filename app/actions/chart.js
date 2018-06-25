import axios from 'axios';
import * as types from '../constant/action_constant';

const popTypes = {
  vpop: 'IWZ9Z08I',
  kpop: 'IWZ9Z0BO',
  pop: 'IWZ9Z0BW',
};

export function getChart(popType) {
  return dispatch => {
    axios.get(`/api/media/chart/${popTypes[popType]}`)
      .then(({ data: res }) => {
        if (res.msg === 'Success') {
          switch (popType) {
          case 'vpop':
            dispatch({ type: types.FETCH_VPOP_CHART, vpop: res.data });
            break;
          case 'kpop':
            dispatch({ type: types.FETCH_KPOP_CHART, kpop: res.data });
            break;
          case 'pop':
            dispatch({ type: types.FETCH_POP_CHART, pop: res.data });
            break;
          default:
            break;
          }
        }
      })
      .catch(err => { throw err; });
  };
}

export function changeActiveChart(popType) {
  return (dispatch, getState) => {
    const state = getState();

    if (Object.keys(state.chartState[popType]).length) {
      dispatch({ type: types.CHANGE_ACTIVE_CHART, activeChart: popType });
    } else {
      dispatch(getChart(popType));
    }
  };
}
