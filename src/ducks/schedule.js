import request from "../util/request";
import { call, put, takeEvery } from "redux-saga/effects";
import { toObject, toArray } from "../util/reshape";
import { createSelector } from "reselect";

export const REQUEST_SCHEDULE = "schedule/REQUEST_SCHEDULE";
export const REQUEST_SUCCEEDED = "schedule/REQUEST_SUCCEEDED";
export const REQUEST_FAILED = "schedule/REQUEST_FAILED";
export const REQUEST_CREATE_SCHEDULE = "schedule/REQUEST_CREATE_SCHEDULE";
export const CREATE_SCHEDULE = "schedule/CREATE_SCHEDULE";

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

export function requestCreateSchedule(newSchedule, onSuccess) {
  return {
    type: REQUEST_CREATE_SCHEDULE,
    newSchedule,
    onSuccess
  };
}

export function requestSchedules() {
  return {
    type: REQUEST_SCHEDULE
  };
}

export const initialState = {};

export default function reducer(state = initialState, action) {
  const { type, requestType, resourceType, response } = action;
  switch (type) {
    case REQUEST_SUCCEEDED:
      if (requestType === REQUEST_SCHEDULE) {
        return resourceType === "SCHEDULE" ? toObject(response, "id") : state;
      }
      if (requestType === CREATE_SCHEDULE) {
        return { ...state, [response.id]: response };
      }
      break;
    default:
      return state;
  }
}

export function* updateEventSaga() {
  yield takeEvery(REQUEST_SCHEDULE, requestAllSchedules);
  yield takeEvery(REQUEST_CREATE_SCHEDULE, createSchedule);
}

export function* createSchedule({ newSchedule, onSuccess }) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSchedule)
    };
    const BASE_URL = `https://ty7dwb6hx3.execute-api.us-east-1.amazonaws.com/dev/schedule`;
    const response = yield call(request, BASE_URL, options);
    const updatedResponse = {
      id: response,
      ...newSchedule
    };
    yield put(
      requestSucceeded(CREATE_SCHEDULE, "SCHEDULE", updatedResponse, null)
    );
    if (onSuccess) {
      onSuccess(updatedResponse);
    }
  } catch (e) {
    console.error(e);
    yield put(requestFailed(CREATE_SCHEDULE, "SCHEDULE", e, null));
  }
}

export function* requestAllSchedules({ type }) {
  try {
    const response = yield call(
      request,
      "https://ty7dwb6hx3.execute-api.us-east-1.amazonaws.com/dev/schedule"
    );
    yield put(requestSucceeded(type, "SCHEDULE", response));
  } catch (e) {
    console.error(e);
    yield put(requestFailed(type, "SCHEDULE", e));
  }
}

export const sagas = [updateEventSaga];

export const schedule = ({ schedule }) => schedule;
export const selected = ({ selected }) => selected;
export const players = ({ players }) => players;

export const getScheduleByEventId = createSelector(
  [schedule, selected, players],
  (scheduleState, selectedState, playersState) => {
    var updatedPlayers = [];
    if (selectedState.EVENT !== null) {
      toArray(scheduleState).map(({ playerid, eventid }) => {
        if (eventid === parseInt(selectedState.EVENT, 10)) {
          const tmp = {
            firstname:
              playersState[playerid] && playersState[playerid].firstname,
            lastname: playersState[playerid] && playersState[playerid].lastname,
            grade: playersState[playerid] && playersState[playerid].grade,
            team: playersState[playerid] && playersState[playerid].team,
            belongto: playersState[playerid] && playersState[playerid].belongto
          };
          updatedPlayers.push(tmp);
        }
        return updatedPlayers;
      });
    }
    return updatedPlayers;
  }
);
