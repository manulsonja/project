import axios from 'axios';
import {  DIFFICULTY_SELECTION,
          MAP_SEARCHSTRING,
          RESET_SELECTION,
          TOUR_SELECTION } from "./types";

export const mapsearch = (searchstring) => dispatch => {
    dispatch({
        type: MAP_SEARCHSTRING,
        payload: searchstring,
    });
};
export const diffselection = (diff) => dispatch => {
    dispatch({
        type: DIFFICULTY_SELECTION,
        payload: diff,
    });
};
export const tourselection = (tourtypes) => dispatch => {
    dispatch({
        type: TOUR_SELECTION,
        payload: tourtypes,
    });
};

export const resetselection = (blabla) => dispatch => {
    dispatch({
        type: RESET_SELECTION,
        payload: blabla,

    });
};



