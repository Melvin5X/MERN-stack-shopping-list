import { GET_ITEMS, ADD_ITEM, DELETE_ITEM,ITEMS_LOADING, ITEMS_LOADING_DONE } from '../actions/types'; 

const initialState = {
    items: [],
    loading: undefined,
    loadingDone: undefined
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
           return {
               ...state,
               items: action.payload,
               loading: false
               
           };
        case DELETE_ITEM:
           return {
               ...state,
               items: state.items.filter(item => item._id!== action.payload) 
           };
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true,
                loadingDone: false
            }
        case ITEMS_LOADING_DONE:
            return {
                ...state,
                loadingDone:true
            } 
        default:
           return state;
    }
}