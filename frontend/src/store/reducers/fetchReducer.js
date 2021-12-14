import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: null
}

const executePostDataSuccess = (state, action) => {
    return {
        ...state
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_DATA_SUCCESS:
            return executePostDataSuccess(state, action);
        default:
            return state;
    }
}

export default reducer;