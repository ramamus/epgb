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

export const Schedule = ({
  events,
  _requestCreateEvent,
  _selectResource,
  scheduleByEvent
}) => {
  const [startDate, setStartDate] = useState(undefined);
  const [title, setTitle] = useState(undefined);
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
      //naviagate to attendence and pull all attendence based on event id
      _selectResource(info.event.id);
      console.log(info.event.title, info.event.id);
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
  console.log(scheduleByEvent);

  return (
    <div>
      <PlayersHotloaders />
      <EventsHotloader />
      <ScheduleHotloaders />
      <div className="p-col-12 p-md-6 p-lg-6">
        <Panel header="Events" style={{ height: "100%" }}>
          <ul className="task-list">
            {events &&
              Object.keys(events).length !== 0 &&
              toArray(events).map(({ id, start, title }) => {
                const formatedDate = moment.utc(start).format("MM/DD/YYYY");
                return (
                  <li key={id}>
                    <span className="task-name">
                      {title} on {formatedDate}
                    </span>
                  </li>
                );
              })}
          </ul>
        </Panel>
        <Panel>
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
      <div className="p-col-12 p-md-6 p-lg-6">
        <Panel header="Calendar" style={{ height: "100%" }}>
          <FullCalendar events={updatedEvents} options={fullcalendarOptions} />
        </Panel>
      </div>
    </div>
  );
};

export default connect(
  state => {
    return {
      events: state.events,
      scheduleByEvent: getScheduleByEventId(state)
    };
  },
  dispatch => ({
    _requestCreateEvent: (newEvent, onSuccess) =>
      dispatch(requestCreateEvent(newEvent, onSuccess)),
    _selectResource: id => dispatch(selectResource("EVENT", id))
  })
)(Schedule);
