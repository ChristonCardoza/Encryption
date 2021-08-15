import { FETCH_ALL} from '../constants/actionTypes';
export default (messages = [], action) => {
    switch(action.type){
        case FETCH_ALL :
            return action.payload;
        default :
            return messages;
    }
}