import React from "react";
import { connect } from "react-redux";
import { Panel } from "primereact/panel";
import { toArray } from "../../util/reshape";
import EventsHotloader from "../../components/hotloaders/EventsHotloaders";

export const Event = ({ events }) => {
  return (
    <div>
      <EventsHotloader />
      <div className="p-col-12 p-md-6 p-lg-4">
        <Panel header="Events" style={{ height: "100%" }}>
          <ul className="task-list">
            {events &&
              Object.keys(events).length !== 0 &&
              toArray(events).map(event => {
                return (
                  <li>
                    <span className="task-name">
                      {event.eventname} on {event.eventdate}
                    </span>
                  </li>
                );
              })}
          </ul>
        </Panel>
      </div>
    </div>
  );
};

export default connect(({ events }) => ({ events }))(Event);
