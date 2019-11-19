import React, { useState } from "react";
import { Panel } from "primereact/panel";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Chart } from "primereact/chart";
import { toArray } from "../../util/reshape";
import { connect } from "react-redux";
import { requestUpdatePlayer } from "../../ducks/players";
import { requestCreateSchedule } from "../../ducks/schedule";
import { isEvent, getTodaysEvent } from "../../ducks/events";
import PlayersHotloaders from "../../components/hotloaders/PlayersHotloaders";
import EventsHotloader from "../../components/hotloaders/EventsHotloaders";

export const Players = ({
  players,
  _requestUpdatePlayer,
  eventToday,
  isEvent,
  _requestCreateSchedule
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = e => setSelectedValue(e.target.value);
  const handleCheckin = e => {
    const updatedPlayer = {
      ...players[e.target.id],
      checkedin: !players[e.target.id].checkedin
    };
    _requestUpdatePlayer(updatedPlayer, () => {
      if (isEvent) {
        const newSchedule = {
          playerid: e.target.id,
          eventid: eventToday[0].id
        };
        _requestCreateSchedule(newSchedule);
      }
    });
  };
  const filterByAnyValue = (arrayOfObjects, searchTeam) => {
    return (
      arrayOfObjects &&
      Object.keys(arrayOfObjects).length !== 0 &&
      toArray(arrayOfObjects).filter(playerObject =>
        Object.keys(playerObject).some(
          key =>
            key !== "id" &&
            playerObject[key]
              .toString()
              .toLowerCase()
              .includes(searchTeam.toString().toLowerCase())
        )
      )
    );
  };
  const groupByGrade =
    players &&
    Object.keys(players).length !== 0 &&
    toArray(players)
      .filter(player => player.checkedin === true)
      .reduce((acc, it) => {
        acc[it.grade] = acc[it.grade] + 1 || 1;
        return acc;
      }, {});
  const groupByBelongTo =
    players &&
    Object.keys(players).length !== 0 &&
    toArray(players)
      .filter(player => player.checkedin === true)
      .reduce((acc, it) => {
        acc[it.belongto] = acc[it.belongto] + 1 || 1;
        return acc;
      }, {});
  const totalAttending =
    players &&
    Object.keys(players).length !== 0 &&
    toArray(players).filter(({ checkedin }) => checkedin === true).length;
  const polarData = {
    datasets: [
      {
        data: [
          groupByGrade[1] || 0,
          groupByGrade[2] || 0,
          groupByGrade[3] || 0,
          groupByGrade[4] || 0,
          groupByGrade[5] || 0,
          groupByGrade[6] || 0,
          groupByGrade[7] || 0,
          groupByGrade[8] || 0
        ],
        backgroundColor: [
          "#9FA9BA",
          "#167D83",
          "#513F66",
          "#FFC107",
          "#03A9F4",
          "#4CAF50",
          "#E91E63",
          "#9C27B0"
        ],
        label: "Grade"
      }
    ],
    labels: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]
  };
  const pieData = {
    labels: ["Travel", "InHouse"],
    datasets: [
      {
        data: [groupByBelongTo["TRAVEL"] || 0, groupByBelongTo["INHOUSE"] || 0],
        backgroundColor: ["#FFC107", "#03A9F4"],
        hoverBackgroundColor: ["#FFE082", "#81D4FA"]
      }
    ]
  };
  return (
    <div className="p-grid p-fluid dashboard">
      <PlayersHotloaders />
      <EventsHotloader /> 
      <div className="p-col-12 p-lg-4">
        <div className="card summary">
          <span className="title">Attendence</span>
          <span className="detail">Players Checkedin</span>
          <span className="count visitors">{totalAttending}</span>
        </div>
      </div>
      <div className="p-col-12 p-md-6 p-xl-3">
        <div className="highlight-box">
          <div
            className="initials"
            style={{ backgroundColor: "#007be5", color: "#00448f" }}
          >
            <span>TR</span>
          </div>
          <div className="highlight-details ">
            <i className="pi pi-briefcase" />
            <span>In Attendence</span>
            <span className="count">{groupByBelongTo["TRAVEL"] || 0}</span>
          </div>
        </div>
      </div>
      <div className="p-col-12 p-md-6 p-xl-3">
        <div className="highlight-box">
          <div
            className="initials"
            style={{ backgroundColor: "#ef6262", color: "#a83d3b" }}
          >
            <span>IN</span>
          </div>
          <div className="highlight-details ">
            <i className="pi pi-home" />
            <span>In Attendence</span>
            <span className="count">{groupByBelongTo["INHOUSE"] || 0}</span>
          </div>
        </div>
      </div>
      <div className="p-col-12 p-lg-4 contacts">
        <div className="p-col-12 p-md-6">
          <div className="p-inputgroup">
            <InputText placeholder="Search" onChange={handleChange} />
            <Button icon="pi pi-search" />
          </div>
        </div>
        <Panel header="Players">
          <ul>
            {players &&
              Object.keys(players).length !== 0 &&
              filterByAnyValue(players, selectedValue).map(
                ({ firstname, lastname, grade, team, checkedin, id }) => {
                  return (
                    <li key={id}>
                      <button className="p-link">
                        <InputSwitch
                          id={id.toString()}
                          checked={checkedin}
                          onChange={event => handleCheckin(event)}
                        />
                        <span className="name">
                          {firstname} {lastname}
                        </span>
                        <span className="email">
                          Grade-{grade} Team-{team}
                        </span>
                      </button>
                    </li>
                  );
                }
              )}
          </ul>
        </Panel>
      </div>
      <div className="p-col-12 p-lg-6">
        <div className="card">
          <h1 className="centerText">Pie Chart</h1>
          <Chart type="pie" data={pieData} height="150" />
        </div>
        <div className="card">
          <h1 className="centerText">Polar Area Chart</h1>
          <Chart type="polarArea" data={polarData} height="150" />
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => {
    return {
      players: state.players,
      isEvent: isEvent(state),
      eventToday: getTodaysEvent(state)
    };
  },
  dispatch => ({
    _requestUpdatePlayer: (updatedPlayer, onSuccess) => {
      dispatch(requestUpdatePlayer(updatedPlayer, onSuccess));
    },
    _requestCreateSchedule: (newSchedule, onSuccess) => {
      dispatch(requestCreateSchedule(newSchedule, onSuccess));
    }
  })
)(Players);
