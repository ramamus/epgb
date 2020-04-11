import request from "../util/request";
import { call, put, takeEvery } from "redux-saga/effects";
import { toObject, toArray } from "../util/reshape";
import { formatPhone } from "../util/format";
import { createSelector } from "reselect";
import moment from "moment";

export const REQUEST_MENTOR = "mentor/REQUEST_MENTOR";
export const REQUEST_SUCCEEDED = "mentor/REQUEST_SUCCEEDED";
export const REQUEST_FAILED = "mentor/REQUEST_FAILED";
export const REQUEST_CREATE_MENTOR = "mentor/REQUEST_CREATE_MENTOR";
export const CREATE_MENTOR = "mentor/CREATE_MENTOR";

export function requestFailed(requestType, resourceType, response, details) {
  return {
    type: REQUEST_FAILED,
    requestType,
    resourceType,
    response,
    details,
  };
}

export function requestSucceeded(requestType, resourceType, response, details) {
  return {
    type: REQUEST_SUCCEEDED,
    requestType,
    resourceType,
    response,
    details,
  };
}

export function requestCreateMentor(newMentor, onSuccess) {
  return {
    type: REQUEST_CREATE_MENTOR,
    newMentor,
    onSuccess,
  };
}

export function requestmentors() {
  return {
    type: REQUEST_MENTOR,
  };
}

export const initialState = {};

export default function reducer(state = initialState, action) {
  const { type, requestType, resourceType, response } = action;
  switch (type) {
    case REQUEST_SUCCEEDED:
      if (requestType === REQUEST_MENTOR) {
        return resourceType === "mentor" ? toObject(response, "id") : state;
      }
      if (requestType === CREATE_MENTOR) {
        return { ...state, [response.id]: response };
      }
      break;
    default:
      return state;
  }
}

export function* updateMentorSaga() {
  yield takeEvery(REQUEST_MENTOR, requestAllMentors);
  yield takeEvery(REQUEST_CREATE_MENTOR, createMentor);
}

export function* createMentor({ newMentor, onSuccess }) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMentor),
    };
    const BASE_URL = `https://uwoseb27dl.execute-api.us-east-1.amazonaws.com/dev/mentor`;
    const response = yield call(request, BASE_URL, options);
    const updatedResponse = {
      id: response,
      ...newMentor,
    };
    yield put(requestSucceeded(CREATE_MENTOR, "mentor", updatedResponse, null));
    if (onSuccess) {
      onSuccess(updatedResponse);
    }
  } catch (e) {
    console.error(e);
    yield put(requestFailed(CREATE_MENTOR, "mentor", e, null));
  }
}

export function* requestAllMentors({ type }) {
  try {
    const response = yield call(
      request,
      "https://uwoseb27dl.execute-api.us-east-1.amazonaws.com/dev/mentor"
    );
    yield put(requestSucceeded(type, "mentor", response));
  } catch (e) {
    console.error(e);
    yield put(requestFailed(type, "mentor", e));
  }
}

export const sagas = [updateMentorSaga];

export const mentor = ({ mentor }) => mentor;
export const selected = ({ selected }) => selected;
export const players = ({ players }) => players;

export const getMentorList = createSelector(
  [mentor, players],
  (mentorState, playersState) => {
    var mentorList = [];
    if (Object.keys(playersState).length > 0) {
      toArray(mentorState).map(
        ({
          playerid,
          coachid,
          committeeid,
          email,
          phone,
          spotlight,
          halftime,
          eventname,
          eventdate,
        }) => {
          const tmp = {
            playername:
              playersState[playerid] &&
              `${playersState[playerid].firstname} ${playersState[playerid].lastname}`,
            committeename:
              playersState[committeeid] &&
              `${playersState[committeeid].firstname} ${playersState[committeeid].lastname}`,
            coachname:
              playersState[coachid] &&
              `${playersState[coachid].firstname} ${playersState[coachid].lastname}`,
            email,
            phone: formatPhone(phone),
            spotlight,
            halftime,
            eventname,
            eventdate: moment.utc(eventdate).format("MM/DD/YYYY"),
          };
          mentorList.push(tmp);
        }
      );
    }
    return mentorList;
  }
);
