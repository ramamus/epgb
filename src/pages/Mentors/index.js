import React, { useState } from "react";
import { connect } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { toArray } from "../../util/reshape";
import { requestCreateMentor, getMentorList } from "../../ducks/mentor";
import MentorHotloader from "../../components/hotloaders/MentorHotloaders";
import PlayersHotloaders from "../../components/hotloaders/PlayersHotloaders";

export const Mentors = ({ mentorList, _requestCreateMentor, players }) => {
  const [startDate, setStartDate] = useState(undefined);
  const [eventName, setEventName] = useState("");
  const [coach, setCoach] = useState("");
  const [player, setPlayer] = useState("");
  const [committee, setCommittee] = useState("");
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const resetState = () => {
    setCoach("");
    setCommittee("");
    setEmail("");
    setEventName("");
    setPhone("");
    setPhone("");
    setPlayer("");
    setStartDate("");
  };
  const addSession = () => {
    const session = {
      playerid: player,
      team: teamName,
      coachid: coach,
      committeeid: committee,
      email: email,
      phone: phone,
      spotlight: null,
      halftime: null,
      eventname: eventName,
      eventdate: startDate,
    };
    _requestCreateMentor(session, resetState);
  };
  const playerList =
    players &&
    toArray(players)
      .filter(({ belongto }) => belongto === "HIGHSCHOOL")
      .map(({ firstname, lastname, id }) => {
        return {
          label: `${firstname} ${lastname}`,
          value: id,
        };
      });
  const coachList =
    players &&
    toArray(players)
      .filter(({ belongto }) => belongto === "COACH")
      .map(({ firstname, lastname, id }) => {
        return {
          label: `${firstname} ${lastname}`,
          value: id,
        };
      });
  const committeeList =
    players &&
    toArray(players)
      .filter(({ belongto }) => belongto === "COMMITTEE")
      .map(({ firstname, lastname, id }) => {
        return {
          label: `${firstname} ${lastname}`,
          value: id,
        };
      });
  const eventSelectItems = [
    { label: "Practice", value: "PRACTICE" },
    { label: "Game", value: "GAME" },
  ];
  const gradeSelectItems = [
    { label: "Freshmen", value: "FRESHMEN" },
    { label: "Sophomore", value: "SOPHOMORE" },
    { label: "Junior", value: "JUNIOR" },
    { label: "Senior", value: "SENIOR" },
  ];
  return (
    <div className="p-grid p-fluid">
      <PlayersHotloaders />
      <MentorHotloader />
      <div className="p-col-12 p-md-4">
        <Dropdown
          value={coach}
          options={coachList}
          onChange={(e) => {
            setCoach(e.value);
          }}
          placeholder="Select Coach"
        />
      </div>
      <div className="p-col-12 p-md-4">
        <InputText
          placeholder="Email"
          id="input"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="p-col-12 p-md-4">
        <InputText
          placeholder="Phone"
          id="input"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="p-col-12 p-md-4">
        <Dropdown
          value={player}
          options={playerList}
          onChange={(e) => {
            setPlayer(e.value);
          }}
          placeholder="Select Mentor"
        />
      </div>
      <div className="p-col-12 p-md-4">
        <Dropdown
          value={teamName}
          options={gradeSelectItems}
          onChange={(e) => {
            setTeamName(e.value);
          }}
          placeholder="Select a Grade"
        />
      </div>
      <div className="p-col-12 p-md-4">
        <Dropdown
          value={committee}
          options={committeeList}
          onChange={(e) => {
            setCommittee(e.value);
          }}
          placeholder="Select Committee Member"
        />
      </div>
      <div className="p-col-12 p-md-4">
        <Dropdown
          value={eventName}
          options={eventSelectItems}
          onChange={(e) => {
            setEventName(e.value);
          }}
          placeholder="Select a Event"
        />
      </div>
      <div className="p-col-12 p-md-4">
        <Calendar
          placeholder="Event Date"
          showIcon={true}
          value={startDate}
          onChange={(e) => setStartDate(e.value)}
        />
      </div>
      <div className="p-col-12 p-md-4" style={{ textAlign: "left" }}>
        <Button
          // disabled={!(!!title && !!startDate)}
          label="Add Session"
          onClick={addSession}
        />
      </div>
      <div className="p-lg-12">
        <div className="card">
          <h1 style={{ fontSize: "16px" }}>
            Mentor Sessions
            <strong style={{ fontSize: "20px" }}>({mentorList.length})</strong>
          </h1>
          <DataTable
            value={mentorList}
            style={{ marginBottom: "20px" }}
            responsive={true}
          >
            <Column field="playername" header="Mentor" sortable={true} />
            <Column field="committeename" header="Member" sortable={true} />
            <Column field="coachname" header="Coach" sortable={true} />
            <Column field="email" header="Email" sortable={true} />
            <Column field="phone" header="Phone" sortable={true} />
            <Column field="eventname" header="Attended" sortable={true} />
            <Column field="eventdate" header="On" sortable={true} />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => {
    return {
      mentorList: getMentorList(state),
      players: state.players,
    };
  },
  (dispatch) => ({
    _requestCreateMentor: (newMentor, onSuccess) =>
      dispatch(requestCreateMentor(newMentor, onSuccess)),
  })
)(Mentors);
