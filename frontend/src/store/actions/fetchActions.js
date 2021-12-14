import * as actionTypes from './actionTypes';
import axios from 'axios';

const postDataSuccess = (response) => {
    return {
        type: actionTypes.POST_DATA_SUCCESS,
        payload: response
    }
}

export const postData = (url, obj, config, props) => {
    return (dispatch) => {
        console.log(obj)
        axios.post(url, obj, config)
          .then(response => {
              dispatch(postDataSuccess(response));
          })
          .catch(error => {
              console.log(error);
          })
    }
}