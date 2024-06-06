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
    <div className="group border-r-[1px] bg-white min-h-screen w-[80px] hover:w-[300px] sticky top-0 space-y-6 py-7 px-2 transition-all duration-500 ease-in-out">
      <ButtonAccount />
      <div className="space-y-4">
        <Link href="/dashboard/dash">
          <div className="flex items-center py-2.5 px-4 rounded transition-all duration-500 ease-in-out hover:bg-primary hover:text-white">
            <LayoutDashboard className="h-8 w-8" />
            <span className="ml-4 hidden group-hover:inline">Dashboard</span>
          </div>
        </Link>
        <Link href="/dashboard/calendar">
          <div className="flex items-center py-2.5 px-4 rounded transition-all duration-500 ease-in-out hover:bg-primary hover:text-white">
            <Calendar className="h-8 w-8" />
            <span className="ml-4 hidden group-hover:inline">Calendar</span>
          </div>
        </Link>
        <Link href="/dashboard/analytics">
          <div className="flex items-center py-2.5 px-4 rounded transition-all duration-500 ease-in-out hover:bg-primary hover:text-white">
            <BarChart4 className="h-8 w-8" />
            <span className="ml-4 hidden group-hover:inline">Analytics</span>
          </div>
        </Link>
        <Link href="/dashboard/clients">
          <div className="flex items-center py-2.5 px-4 rounded transition-all duration-500 ease-in-out hover:bg-primary hover:text-white">
            <UsersRound className="h-8 w-8" />
            <span className="ml-4 hidden group-hover:inline">Clients</span>
          </div>
        </Link>
        <div>
          <Link href="/dashboard/client-progress">
            <div className="flex items-center py-2.5 px-4 rounded transition-all duration-500 ease-in-out hover:bg-primary hover:text-white">
              <LineChart className="h-8 w-8" />
              <span className="ml-4 hidden group-hover:inline">
                Client Progress
              </span>
            </div>
          </Link>
          <div className="ml-12 space-y-4">
            <Link href="/dashboard/client-progress/add-weekly-report">
              <div className="flex items-center py-2.5 px-4 rounded transition-all duration-500 ease-in-out hover:bg-primary hover:text-white">
                <PlusCircle className="h-5 w-5" />
                <span className="ml-4 hidden group-hover:inline">
                  Add Weekly Report
                </span>
              </div>
            </Link>
          </div>
        </div>
        <Link href="/dashboard/leads">
          <div className="flex items-center py-2.5 px-4 rounded transition-all duration-500 ease-in-out hover:bg-primary hover:text-white">
            <Contact className="h-8 w-8" />
            <span className="ml-4 hidden group-hover:inline">Leads</span>
          </div>
        </Link>
        <Link href="/dashboard/workout">
          <div className="flex items-center py-2.5 px-4 rounded transition-all duration-500 ease-in-out hover:bg-primary hover:text-white">
            <Dumbbell className="h-8 w-8" />
            <span className="ml-4 hidden group-hover:inline">
              Workout Generator
            </span>
          </div>
        </Link>
        <Link href="/dashboard/mealprep">
          <div className="flex items-center py-2.5 px-4 rounded transition-all duration-500 ease-in-out hover:bg-primary hover:text-white">
            <Utensils className="h-8 w-8" />
            <span className="ml-4 hidden group-hover:inline">
              Meal Prep Generator
            </span>
          </div>
        </Link>
        <Link href="/dashboard/video">
          <div className="flex items-center py-2.5 px-4 rounded transition-all duration-500 ease-in-out hover:bg-primary hover:text-white">
            <Video className="h-8 w-8" />
            <span className="ml-4 hidden group-hover:inline">Video</span>
          </div>
        </Link>
        <Link href="/dashboard/think-tank">
          <div className="flex items-center py-2.5 px-4 rounded transition-all duration-500 ease-in-out hover:bg-primary hover:text-white">
            <Brain className="h-8 w-8" />
            <span className="ml-4 hidden group-hover:inline">Think Tank</span>
          </div>
        </Link>
        <Link href="/dashboard/settings">
          <div className="flex items-center py-2.5 px-4 rounded transition-all duration-500 ease-in-out hover:bg-primary hover:text-white">
            <Settings className="h-8 w-8" />
            <span className="ml-4 hidden group-hover:inline">Settings</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
