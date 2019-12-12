/**
 *  Register your ducks here. For each duck:
 *      - import the reducer and sagas array
 *      - add the reducer to the default export
 *      - add the sagas array to allSagas using spread operator
 */

import { all, fork } from "redux-saga/effects";
import sort from "./sort";
import players, { sagas as playerSagas } from "./players";
import events, { sagas as eventsSagas } from "./events";
import schedule, { sagas as scheduleSagas } from "./schedule";
import search from "./search";
import selected from "./selected";

export default {
  players,
  events,
  schedule,
  search,
  sort,
  selected
};

const allSagas = [...playerSagas, ...eventsSagas, ...scheduleSagas];

export function* rootSaga() {
  yield all(allSagas.map(saga => fork(saga)));
}
