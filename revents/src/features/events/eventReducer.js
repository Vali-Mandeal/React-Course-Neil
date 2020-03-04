import eventListData from './seedData';
import { createReducer } from './../../app/common/util/reducerUtils';
import { CREATE_EVENT, UPDATE_EVENT,  DELETE_EVENT } from './eventConstants';

const initialState = eventListData;

const createEvent = (state, payload) => {
    return [...state, payload.event]
}

const updateEvent = (state, payload) => {
    return [
        ...state.filter(event => event.id !== payload.event.id),
        payload.event
    ]
}

const deleteEvent = (state, payload) => {
    return [
        ...state.filter(event => event.id !== payload.eventId)
    ]
}

export default createReducer(initialState, {
    [CREATE_EVENT] : createEvent,
    [UPDATE_EVENT]: updateEvent,
    [DELETE_EVENT]: deleteEvent
})