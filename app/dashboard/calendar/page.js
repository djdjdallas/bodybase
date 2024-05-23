// app/dashboard/calendar/page.js
"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/sass/styles.scss";

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: "Design review",
    start: new Date(2022, 0, 3, 10, 0), // 3 Jan 2022 10:00 AM
    end: new Date(2022, 0, 3, 11, 0),
  },
  {
    title: "Sales meeting",
    start: new Date(2022, 0, 3, 14, 0), // 3 Jan 2022 2:00 PM
    end: new Date(2022, 0, 3, 15, 0),
  },
  // Add more events here
];

export default function MyCalendar() {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 h-screen">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          className="rbc-calendar"
        />
      </div>
    </div>
  );
}
