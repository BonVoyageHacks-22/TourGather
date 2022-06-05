import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import enUS from 'date-fns/locale/en-US'
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// dummy data
const events = [
  {
      title: "Mike Gowsling",
      start: new Date(2022, 5, 21),
      end: new Date(2022, 5, 21),
  },
  {
      title: "Betty Tan",
      start: new Date(2022, 5, 7, 14, 20),
      end: new Date(2022, 5, 7, 15, 20),
  },
  {
      title: "Peter Lim",
      start: new Date(2022, 5, 20),
      end: new Date(2022, 5, 20),
  },
];

function App() {
  // Array
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function addEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div className="App">
      <h1 style={{ fontSize: "50px", marginTop: "10px", marginBottom: "10px", color: "darkblue" }}>Calendar</h1>
            <h2 style={{ fontSize: "25px", marginTop: "10px", marginBottom: "10px", color: "darkblue" }}>Add New Tour</h2>
            <div>
                <input type="text" placeholder="Add Tour Guide Name" style={{ height: "20px", width: "20%", marginRight: "10px", marginLeft: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}></input>
                <DatePicker 
                  placeholderText="Start Date" 
                  showTimeSelect
                  popperPlacement="bottom"
                  style={{ height: "20px", width: "20%", marginRight: "10px", marginLeft: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })}></DatePicker>
                <DatePicker 
                  placeholderText="End Date" 
                  showTimeSelect
                  popperPlacement="bottom"
                  style={{ height: "20px", width: "20%", marginRight: "10px", marginLeft: "10px" }} selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })}></DatePicker>
                
                <button onClick={addEvent} style={{ left: "20px", top: "20%", marginTop: "10px" }}>Add Tour</button>
            </div>

            <Calendar 
              localizer={localizer} 
              events={allEvents} 
              startAccessor="start" 
              endAccessor="end" 
              views={['month', 'week', 'day', 'agenda']}
              style={{ alignContent: "center", height: 500, width: "97%", marginBlockStart: "30px", marginBlockEnd: "30px", marginInlineStart: "30px", marginInlineEnd: "30px", color: "darkblue", backgroundColor: "white"}} />
    </div>
  );
}

export default App;
