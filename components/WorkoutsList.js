// components/WorkoutsList.js
import React, { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";

const WorkoutsList = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const { data, error } = await supabase.from("workout_plans").select("*");
      if (error) {
        console.error("Error fetching workouts:", error);
      } else {
        setWorkouts(data);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id} className="mb-2 p-2 border rounded">
            <div className="font-semibold">{workout.name}</div>
            <div>{workout.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutsList;
