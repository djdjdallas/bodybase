// components/Sidebar.js
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-screen sticky top-0 bg-base-200 text-base-content w-64 space-y-6 py-7 px-2">
      <div className="space-y-4">
        <Link
          href="/dashboard/analytics"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-primary-content"
        >
          Analytics
        </Link>
        <Link
          href="/dashboard/workout-generator"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-primary-content"
        >
          Workout Generator
        </Link>
        <Link
          href="/dashboard/meal-prep-generator"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-primary-content"
        >
          Meal Prep Generator
        </Link>
        <Link
          href="/dashboard/settings"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-primary-content"
        >
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
