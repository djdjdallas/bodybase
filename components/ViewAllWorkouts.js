// components/ViewAllWorkouts.js
import React from "react";
import ViewAllWorkoutsDetails from "./ViewAllWorkoutsDetails";

const ViewAllWorkouts = ({ workouts }) => {
  return (
    <div className="view-all-workouts">
      <h2>All Workouts</h2>
      {workouts.map((workout, index) => (
        <ViewAllWorkoutsDetails key={index} workout={workout} />
      ))}
    </div>
  );
};

export default ViewAllWorkouts;
