// app/dashboard/calendar/CalendarWrapper.js
"use client";

import { SessionProvider } from "next-auth/react";
import MyCalendar from "./page";

const CalendarWrapper = () => {
  return (
    <SessionProvider>
      <MyCalendar />
    </SessionProvider>
  );
};

export default CalendarWrapper;
