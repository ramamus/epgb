import request from '../util/request';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toObject } from '../util/reshape';

export const REQUEST_UPDATE_EVENT = 'events/REQUEST_UPDATE_EVENT';
export const UPDATE_EVENT = 'events/UPDATE_EVENT';
export const REQUEST_CREATE_EVENT = 'events/REQUEST_CREATE_EVENT';
export const CREATE_EVENT = 'events/CREATE_EVENT';
export const REQUEST_EVENTS = 'events/REQUEST_EVENTS';
export const REQUEST_SUCCEEDED = 'events/REQUEST_SUCCEEDED';
export const REQUEST_FAILED = 'events/REQUEST_FAILED';

export function requestFailed(requestType, resourceType, response, details) {
  return {
    type: REQUEST_FAILED,
    requestType,
    resourceType,
    response,
    details
  };
}

export function requestSucceeded(requestType, resourceType, response, details) {
  return {
    type: REQUEST_SUCCEEDED,
    requestType,
    resourceType,
    response,
    details
  };
}

export function requestUpdateEvent(updatedEvent, onSuccess) {
  return {
    type: REQUEST_UPDATE_EVENT,
    updatedEvent,
    onSuccess
  };
}

export function requestCreateEvent(newEvent, onSuccess){
  return {
    type: REQUEST_CREATE_EVENT,
    newEvent,
    onSuccess
  }
}

export function requestEvents() {
  return {
    type: REQUEST_EVENTS
  };
}

export const initialState = {};

export default function reducer(state = initialState, action) {
  const { type, requestType, resourceType, response } = action;
  switch (type) {
    case REQUEST_SUCCEEDED:
      if (requestType === REQUEST_EVENTS) {
        return resourceType === 'EVENTS' ? toObject(response, 'id') : state;
      }
      if (requestType === UPDATE_EVENT || requestType === CREATE_EVENT) {
        return { ...state, [response.id]: response };
      }
      break;
    default:
      return state;
  }
}

export function* updateEventSaga() {
  yield takeEvery(REQUEST_UPDATE_EVENT, updateEvent);
  yield takeEvery(REQUEST_EVENTS, requestAllEvents);
  yield takeEvery(REQUEST_CREATE_EVENT, createEvent);
}

export function* requestAllEvents({ type }) {
  try {
    const response = yield call(
      request,
      'https://8g9xcx7821.execute-api.us-east-1.amazonaws.com/dev/event'
    );
    yield put(requestSucceeded(type, 'EVENTS', response));
  } catch (e) {
    console.error(e);
    yield put(requestFailed(type, 'EVENTS', e));
  }
}

export function* createEvent({ newEvent, onSuccess }) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    };
    const BASE_URL = `https://8g9xcx7821.execute-api.us-east-1.amazonaws.com/dev/event`;
    const response = yield call(request, BASE_URL, options);
    const updatedResponse = {
      id: response,
      ...newEvent
    }
    yield put(requestSucceeded(CREATE_EVENT, 'EVENTS', updatedResponse, null));
    if (onSuccess) {
      onSuccess(updatedResponse);
    }
  } catch (e) {
    console.error(e);
    yield put(requestFailed(UPDATE_EVENT, 'EVENTS', e, null));
  }
}

export function* updateEvent({ updatedEvent, onSuccess }) {
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedEvent)
    };
    const BASE_URL = `https://8g9xcx7821.execute-api.us-east-1.amazonaws.com/dev/event/${updatedEvent.id}`;
    const response = yield call(request, BASE_URL, options);
    yield put(requestSucceeded(UPDATE_EVENT, 'EVENTS', response, null));
    if (onSuccess) {
      onSuccess([response]);
    }
  } catch (e) {
    console.error(e);
    yield put(requestFailed(UPDATE_EVENT, 'EVENTS', e, null));
  }
}

export const sagas = [updateEventSaga];

export const events = ({ events }) => events;








