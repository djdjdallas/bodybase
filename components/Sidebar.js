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
  LineChart,
  Brain,
  PlusCircle,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="border-r-[1px] bg-[#FFFFFF] min-h-screen w-[60px] hover:w-[250px] sticky top-0 space-y-6 py-7 px-2 transition-all duration-300 group">
      <ButtonAccount />
      <div className="space-y-4">
        <Link
          href="/dashboard/dash"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary"
        >
          <LayoutDashboard className="h-8 w-8 text-base-content group-hover:text-black" />
          <span className="sidebar-text ml-4 text-base-content hidden group-hover:inline group-focus:inline group-hover:text-black">
            Dashboard
          </span>
        </Link>
        <Link
          href="/dashboard/calendar"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary"
        >
          <Calendar className="h-8 w-8 text-base-content group-hover:text-black" />
          <span className="sidebar-text ml-4 text-base-content hidden group-hover:inline group-focus:inline group-hover:text-black">
            Calendar
          </span>
        </Link>
        <Link
          href="/dashboard/analytics"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary"
        >
          <BarChart4 className="h-8 w-8 text-base-content group-hover:text-black" />
          <span className="sidebar-text ml-4 text-base-content hidden group-hover:inline group-focus:inline group-hover:text-black">
            Analytics
          </span>
        </Link>
        <Link
          href="/dashboard/clients"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary"
        >
          <UsersRound className="h-8 w-8 text-base-content group-hover:text-black" />
          <span className="sidebar-text ml-4 text-base-content hidden group-hover:inline group-focus:inline group-hover:text-black">
            Clients
          </span>
        </Link>
        <div className="group">
          <Link
            href="/dashboard/client-progress"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary"
          >
            <LineChart className="h-8 w-8 text-base-content group-hover:text-black" />
            <span className="sidebar-text ml-4 text-base-content hidden group-hover:inline group-focus:inline group-hover:text-black">
              Client Progress
            </span>
          </Link>
          <div className="ml-12 space-y-4">
            <Link
              href="/dashboard/add-weekly-report"
              className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary"
            >
              <PlusCircle className="h-5 w-5 text-base-content group-hover:text-black" />
              <span className="sidebar-text ml-4 text-base-content hidden group-hover:inline group-focus:inline group-hover:text-black">
                Add Weekly Report
              </span>
            </Link>
          </div>
        </div>
        <Link
          href="/dashboard/leads"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary"
        >
          <Contact className="h-8 w-8 text-base-content group-hover:text-black" />
          <span className="sidebar-text ml-4 text-base-content hidden group-hover:inline group-focus:inline group-hover:text-black">
            Leads
          </span>
        </Link>
        <Link
          href="/dashboard/workout"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary"
        >
          <Dumbbell className="h-8 w-8 text-base-content group-hover:text-black" />
          <span className="sidebar-text ml-4 text-base-content hidden group-hover:inline group-focus:inline group-hover:text-black">
            Workout Generator
          </span>
        </Link>
        <Link
          href="/dashboard/mealprep"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary"
        >
          <Utensils className="h-8 w-8 text-base-content group-hover:text-black" />
          <span className="sidebar-text ml-4 text-base-content hidden group-hover:inline group-focus:inline group-hover:text-black">
            Meal Prep Generator
          </span>
        </Link>
        <Link
          href="/dashboard/video"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary"
        >
          <Video className="h-8 w-8 text-base-content group-hover:text-black" />
          <span className="sidebar-text ml-4 text-base-content hidden group-hover:inline group-focus:inline group-hover:text-black">
            Video
          </span>
        </Link>
        <Link
          href="/dashboard/think-tank"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary"
        >
          <Brain className="h-8 w-8 text-base-content group-hover:text-black" />
          <span className="sidebar-text ml-4 text-base-content hidden group-hover:inline group-focus:inline group-hover:text-black">
            Think Tank
          </span>
        </Link>
        <Link
          href="/dashboard/settings"
          className="group flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-primary"
        >
          <Settings className="h-8 w-8 text-base-content group-hover:text-black" />
          <span className="sidebar-text ml-4 text-base-content hidden group-hover:inline group-focus:inline group-hover:text-black">
            Settings
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
