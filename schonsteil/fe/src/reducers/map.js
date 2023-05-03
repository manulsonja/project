import { DIFFICULTY_SELECTION, DISTANCE_SLIDER_VALUE, DURATION_SLIDER_VALUE, ELEVATION_SLIDER_VALUE, HUTTYPE_SELECTION, LOCATION_SELECTION, MAP_SEARCHSTRING, RESET_SELECTION, TOUR_SELECTION } from "../actions/types";

const initialState = {
    difficulty: [],
    tourtype: [],
    huttype: [],
    locationtype: [],
    searchstring: '',
    distance: [0,20],
    elevation: [0,20],
    duration: [0,20],
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
        case DISTANCE_SLIDER_VALUE: return {
            ...state,
            distance: payload,        
        }
        case ELEVATION_SLIDER_VALUE: return {
            ...state,
            elevation: payload,        
        }
        case DURATION_SLIDER_VALUE: return {
            ...state,
            duration: payload,        
        }
        case RESET_SELECTION: return {
            difficulty: [],
            tourtype: [],
            huttype: [],
            locationtype: [],
            searchstring: '',
            distance: [0,20],
            elevation: [0,20],
            duration: [0,20],     
    }
        default:
            return state
    }
   
}


