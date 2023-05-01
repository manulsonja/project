import { DIFFICULTY_SELECTION, HUTTYPE_SELECTION, LOCATION_SELECTION, MAP_SEARCHSTRING, RESET_SELECTION, TOUR_SELECTION } from "../actions/types";

const initialState = {
    difficulty: [],
    tourtype: [],
    huttype: [],
    locationtype: [],
    searchstring: '',
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
    case HUTTYPE_SELECTION: return {
        ...state,
        huttype: payload,        
}
    case LOCATION_SELECTION: return {
        ...state,
        locationtype: payload,        
    }
        case MAP_SEARCHSTRING: return {
            ...state,
            searchstring: payload,        
    }
        case RESET_SELECTION: return {
            difficulty: [],
            tourtype:[],
            huttype:[],
            searchstring: '',        
    }
        default:
            return state
    }
   
}


