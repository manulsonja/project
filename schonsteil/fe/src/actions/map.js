import axios from 'axios';
import {  DIFFICULTY_SELECTION,
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
export const huttypeselection = (huttypes) => dispatch => {
    dispatch({
        type: HUTTYPE_SELECTION,
        payload: huttypes,
    });
};
export const locationselection = (locationtypes) => dispatch => {
    dispatch({
        type: LOCATION_SELECTION,
        payload: locationtypes,
    });
};
export const durationselection = (duration) => dispatch => {
    dispatch({
        type: DURATION_SLIDER_VALUE,
        payload: duration,
    });
};
export const elevationselection = (elevation) => dispatch => {
    dispatch({
        type: ELEVATION_SLIDER_VALUE,
        payload: elevation,
    });
};
export const distancesetmax = (rmax) => dispatch => {
    dispatch({
        type: DISTANCE_MAX,
        payload: rmax,
    });
};
export const durationsetmax = (dmax) => dispatch => {
    dispatch({
        type: DURATION_MAX,
        payload: dmax,
    });
};
export const elevationsetmax = (emax) => dispatch => {
    dispatch({
        type: ELEVATION_MAX,
        payload: emax,
    });
};
export const distanceselection = (distance) => dispatch => {
    dispatch({
        type: DISTANCE_SLIDER_VALUE,
        payload: distance,
    });
};

export const resetselection = (blabla) => dispatch => {
    dispatch({
        type: RESET_SELECTION,
        payload: blabla,
    });
};

export const mapoffset = (offset) => dispatch => {
    dispatch({
        type: MAP_OFFSET,
        payload: offset,
    });
};


