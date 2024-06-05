"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { Button } from "@/components/ui/button";
import AddEventModal from "@/components/AddEventModal";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*");
    if (error) {
      console.error("Error fetching events:", error);
    } else {
      setEvents(data);
    }
  };

  const addEvent = async (event) => {
    const { data, error } = await supabase.from("events").insert([event]);
    if (error) {
      console.error("Error adding event:", error);
    } else {
      setEvents((prevEvents) => [...prevEvents, data[0]]);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      console.error("Error deleting event:", error);
    } else {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const handleAddEvent = (newEvent) => {
    addEvent(newEvent);
  };

  const handleIntegrateGoogleCalendar = () => {
    window.location.href = "/api/google-auth";
  };

  const fetchGoogleCalendarEvents = async (accessToken) => {
    try {
      const response = await fetch("/api/calendar", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        // Process the Google Calendar events data
        console.log("Google Calendar events:", data);
      } else {
        console.error("Error fetching Google Calendar events:", data.error);
      }
    } catch (error) {
      console.error("Error fetching Google Calendar events:", error);
    }
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      const cookies = document.cookie.split("; ");
      const accessTokenCookie = cookies.find((row) =>
        row.startsWith("google_access_token")
      );
      if (accessTokenCookie) {
        const accessToken = accessTokenCookie.split("=")[1];
        if (accessToken) {
          fetchGoogleCalendarEvents(accessToken);
        }
      }
    };
    fetchAccessToken();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#FAFBFC]">
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 w-full mb-6">
        <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
        <div className="space-y-4 overflow-y-auto max-h-64">
          {events.map((event) => (
            <div key={event.id} className="flex items-start gap-4">
              <div className="bg-primary-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {new Date(event.start_time).getDate()}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {event.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(event.start_time).toLocaleDateString()} |{" "}
                  {new Date(event.start_time).toLocaleTimeString()} -{" "}
                  {new Date(event.end_time).toLocaleTimeString()}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        /* Handle edit */
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(event.id)}>
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked={event.completed}>
                      Completed
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="grid grid-cols-7 gap-4">
            <Button variant="outline" className="col-span-1">
              <CalendarDaysIcon className="w-4 h-4 mr-2" />
              Month
            </Button>
            <Button variant="outline" className="col-span-1">
              <CalendarDaysIcon className="w-4 h-4 mr-2" />
              Week
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsModalOpen(true)}>Add Event</Button>
            <Button onClick={handleIntegrateGoogleCalendar}>
              Integrate Google Calendar
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-4 h-full">
          <div className="col-span-7 border rounded-lg border-gray-200 dark:border-gray-800 p-4 h-full overflow-hidden">
            <div className="grid grid-cols-7 gap-4 h-full">
              <div className="font-semibold text-center py-2">Sun</div>
              <div className="font-semibold text-center py-2">Mon</div>
              <div className="font-semibold text-center py-2">Tue</div>
              <div className="font-semibold text-center py-2">Wed</div>
              <div className="font-semibold text-center py-2">Thu</div>
              <div className="font-semibold text-center py-2">Fri</div>
              <div className="font-semibold text-center py-2">Sat</div>
              {Array.from({ length: 35 }, (_, i) => (
                <Popover key={i}>
                  <PopoverTrigger asChild>
                    <div
                      onClick={() => handleDayClick(new Date(2023, 11, i + 1))}
                      className={`bg-white dark:bg-gray-950 rounded-lg flex items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer ${
                        i % 7 === 0
                          ? "text-red-500"
                          : "text-gray-900 dark:text-gray-50"
                      }`}
                      style={{ height: "100px" }}
                    >
                      {i + 1}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Button onClick={() => setIsModalOpen(true)}>
                      Add Event
                    </Button>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddEventModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEventAdded={handleAddEvent}
      />
    </div>
  );
};

export default MyCalendar;

function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
