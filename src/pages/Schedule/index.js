import React from "react";
import { Panel } from "primereact/panel";
import { FullCalendar } from "primereact/fullcalendar";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

export const Schedule = () => {
  const fullcalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    defaultDate: "2019-11-01",
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,agendaWeek,agendaDay"
    },
    editable: true
  };
  const events = [
    {
      id: 1,
      title: "Give & Go Mentoring Program",
      start: "2019-11-18"
    }
  ];
  return (
    <div className="p-col-12 p-lg-8">
      <Panel header="Calendar" style={{ height: "100%" }}>
        <FullCalendar
          events={events}
          options={fullcalendarOptions}
        ></FullCalendar>
      </Panel>
    </div>
  );
};

export default Schedule;