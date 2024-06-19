// components/ViewAllWorkoutsDetails.js
import React from "react";

const ViewAllWorkoutsDetails = ({ workout }) => {
  return (
    <div className="workout-details">
      <h3>{workout.name}</h3>
      <ul>
        {workout.exercises.map((exercise, index) => (
          <li key={index}>
            <strong>{exercise.name}</strong>: {exercise.sets} sets of{" "}
            {exercise.reps} reps
            {exercise.weight && ` with ${exercise.weight} kg`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAllWorkoutsDetails;
