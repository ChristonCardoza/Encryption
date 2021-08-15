import * as api from '../api';
import { FETCH_ALL } from '../constants/actionTypes';

export const getMessages = () => async (dispatch) => {
    try {
        const { data } = await api.fetchMessages();
        dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error);
    }
}

