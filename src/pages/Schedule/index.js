import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { FullCalendar } from "primereact/fullcalendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { toArray } from "../../util/reshape";
import { requestCreateEvent } from "../../ducks/events";
import { getScheduleByEventId } from "../../ducks/schedule";
import EventsHotloader from "../../components/hotloaders/EventsHotloaders";
import ScheduleHotloaders from "../../components/hotloaders/ScheduleHotloaders";
import PlayersHotloaders from "../../components/hotloaders/PlayersHotloaders";
import { selectResource } from "../../ducks/selected";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const Schedule = ({
  events,
  _requestCreateEvent,
  _selectResource,
  playerAttendenceByEvent
}) => {
  const [startDate, setStartDate] = useState(undefined);
  const [title, setTitle] = useState(undefined);
  const [eventName, setEventName] = useState('');
  const addEvent = () => {
    const event = {
      title,
      start: moment.utc(startDate).format("MM-DD-YYYY")
    };
    _requestCreateEvent(event, () => {
      setTitle(undefined);
      setStartDate(undefined);
    });
  };
  const fullcalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    eventClick: info => {
      setEventName(info.event.title);
      _selectResource(info.event.id);
    },
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,agendaWeek,agendaDay"
    },
    editable: true
  };
  const updatedEvents =
    events &&
    Object.keys(events).length !== 0 &&
    toArray(events).map(event => ({
      ...event,
      start: moment.utc(event.start).format("YYYY-MM-DD")
    }));
  return (
    <div className="p-grid p-fluid">
      <PlayersHotloaders />
      <EventsHotloader />
      <ScheduleHotloaders />
      <div className="p-col-4">
        <Panel header="Calendar" style={{ height: "100%" }}>
          <FullCalendar events={updatedEvents} options={fullcalendarOptions} />
        </Panel>
      </div>
      <div className="p-col-4">
        <Panel header="Events" style={{ height: "100%" }}>
          <div className="p-col-12 p-md-4">
            <InputText
              placeholder="Event Name"
              id="input"
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="p-col-12">
            <Calendar
              placeholder="Event Date"
              showIcon={true}
              value={startDate}
              onChange={e => setStartDate(e.value)}
            />
          </div>
          <div className="p-col-12 p-md-4" style={{ textAlign: "left" }}>
            <Button
              disabled={!(!!title && !!startDate)}
              label="Add Event"
              onClick={addEvent}
            />
          </div>
        </Panel>
      </div>
      <div className="p-col-12 p-lg-6">
      <div className="card">
        <h1 style={{ fontSize: "16px" }}>Players Attended {eventName} <strong style={{ fontSize: '20px' }}>({playerAttendenceByEvent.length})</strong></h1>
        <DataTable
          value={playerAttendenceByEvent}
          style={{ marginBottom: "20px" }}
          responsive={true}
        >
          <Column field="firstname" header="First Name" sortable={true} />
          <Column field="lastname" header="Last Name" sortable={true} />
          <Column field="grade" header="Grade" sortable={true} />
          <Column field="team" header="Team" sortable={true} />
          <Column field="belongto" header="Plays For" sortable={true} />
        </DataTable>
      </div>
    </div>
    </div>
  );
};

export default connect(
  state => {
    return {
      events: state.events,
      playerAttendenceByEvent: getScheduleByEventId(state)
    };
  },
  dispatch => ({
    _requestCreateEvent: (newEvent, onSuccess) =>
      dispatch(requestCreateEvent(newEvent, onSuccess)),
    _selectResource: id => dispatch(selectResource("EVENT", id))
  })
)(Schedule);
