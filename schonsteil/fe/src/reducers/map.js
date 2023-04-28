import { DIFFICULTY_SELECTION, MAP_SEARCHSTRING, TOUR_SELECTION } from "../actions/types";

const initialState = {
    difficulty: "",
    tourtype: null,
    searchstring: null,
};


export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case DIFFICULTY_SELECTION: return {
                ...state,
                difficulty: payload,        
    }
        case TOUR_SELECTION: return {
            ...state,
            tourtype: payload,        
    }
        case MAP_SEARCHSTRING: return {
            ...state,
            searchstring: payload,        
    }
        default:
            return state
    }
   
}


