import { 
    DIFFICULTY_SELECTION, 
    DISTANCE_MAX,
    DURATION_MAX, 
    DISTANCE_SLIDER_VALUE, 
    DURATION_SLIDER_VALUE, 
    ELEVATION_SLIDER_VALUE, 
    HUTTYPE_SELECTION, 
    LOCATION_SELECTION, 
    MAP_OFFSET, 
    MAP_SEARCHSTRING, 
    RESET_SELECTION, 
    ELEVATION_MAX,
    TOUR_SELECTION, 
    SLIDER_RELOAD_VAR,
    D3_SELECTION,
    D3_INDEX,
    D3_ELEVATION} from "../actions/types";

const initialState = {
    offset: 0,
    difficulty: [],
    tourtype: [],
    huttype: [],
    locationtype: [],
    searchstring: '',
    distance: [0,30000],
    elevation: [0,3000],
    duration: [0,600],
    distance_max: 30000,
    duration_max: 600,
    reload_state: false,
    d3selection: 0,
    d3index:0,
    d3elevation:0,

};


export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case D3_SELECTION: return {
            ...state,
            d3selection: payload,        
    }

    case D3_ELEVATION: return {
        ...state,
        d3elevation: payload,        
}
    
    case D3_INDEX: return {
        ...state,
        d3index: payload,        
}
        case SLIDER_RELOAD_VAR: return {
            ...state,
            reload_state: payload,        
    }
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
        case MAP_OFFSET: return {
            ...state,
            offset: payload,        
        }
        case ELEVATION_MAX: return {
            ...state,
            elevation_max: payload,        
        }
        case DISTANCE_MAX: return {
            ...state,
            distance_max: payload,        
        }
        case DURATION_MAX: return {
            ...state,
            duration_max: payload,        
        }
        case RESET_SELECTION: return {
            ...state,
            difficulty: [],
            tourtype: [],
            huttype: [],
            locationtype: [],
            searchstring: '',
            distance: [0,30000],
            elevation: [0,3000],
            duration: [0,600], 
            d3selection: 0,    
            d3index:0,
            d3elevation: 0,
    }
        default:
            return state
    }
   
}


