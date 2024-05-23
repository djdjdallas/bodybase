// components/Sidebar.js
import Link from "next/link";
import ButtonAccount from "@/components/ButtonAccount";
import {
  LayoutDashboard,
  Calendar,
  BarChart4,
  UsersRound,
  Contact,
  Dumbbell,
  Utensils,
  Video,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="min-h-screen w-[60px] hover:w-[250px] sticky top-0 bg-base-200 text-base-content space-y-6 py-7 px-2 transition-all duration-300">
      <ButtonAccount />
      <div className="space-y-4">
        <Link
          href="/dashboard/dash"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-primary-content"
        >
          <LayoutDashboard className="h-8 w-8 text-[#FAFBFC]" />
          <span className="sidebar-text ml-4 hidden group-hover:inline ">
            Dashboard
          </span>
        </Link>
        <Link
          href="/dashboard/calendar"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-primary-content"
        >
          <Calendar className="h-8 w-8 text-[#FAFBFC]" />
          <span className="sidebar-text ml-4 hidden group-hover:inline text-[#FAFBFC]">
            Calendar
          </span>
        </Link>
        <Link
          href="/dashboard/analytics"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-primary-content"
        >
          <BarChart4 className="h-8 w-8 text-[#FAFBFC]" />
          <span className="sidebar-text ml-4 hidden group-hover:inline text-[#FAFBFC]">
            Analytics
          </span>
        </Link>
        <Link
          href="/dashboard/clients"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-primary-content"
        >
          <UsersRound className="h-8 w-8 text-[#FAFBFC]" />
          <span className="sidebar-text ml-4 hidden group-hover:inline text-[#FAFBFC]">
            Clients
          </span>
        </Link>
        <Link
          href="/dashboard/leads"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-primary-content"
        >
          <Contact className="h-8 w-8 text-[#FAFBFC]" />
          <span className="sidebar-text ml-4 hidden group-hover:inline text-[#FAFBFC]">
            Leads
          </span>
        </Link>
        <Link
          href="/dashboard/workout"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-primary-content"
        >
          <Dumbbell className="h-8 w-8 text-[#FAFBFC]" />
          <span className="sidebar-text ml-4 hidden group-hover:inline text-[#FAFBFC]">
            Workout Generator
          </span>
        </Link>
        <Link
          href="/dashboard/mealprep"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-primary-content"
        >
          <Utensils className="h-8 w-8 text-[#FAFBFC]" />
          <span className="sidebar-text ml-4 hidden group-hover:inline text-[#FAFBFC]">
            Meal Prep Generator
          </span>
        </Link>
        <Link
          href="/dashboard/video"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-primary-content"
        >
          <Video className="h-8 w-8 text-[#FAFBFC]" />
          <span className="sidebar-text ml-4 hidden group-hover:inline text-[#FAFBFC]">
            Video
          </span>
        </Link>
        <Link
          href="/dashboard/settings"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-primary-content"
        >
          <Settings className="h-8 w-8 text-[#FAFBFC]" />
          <span className="sidebar-text ml-4 hidden group-hover:inline text-[#FAFBFC]">
            Settings
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
