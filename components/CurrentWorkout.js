// components/CurrentWorkout.js
import React from "react";

const CurrentWorkout = ({ workout }) => {
  return (
    <div className="current-workout">
      <h2>Current Workout</h2>
      {workout.exercises && (
        <ul>
          {workout.exercises.map((exercise, index) => (
            <li key={index}>
              <strong>{exercise.name}</strong>: {exercise.sets} sets of{" "}
              {exercise.reps} reps
              {exercise.weight && ` with ${exercise.weight} kg`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrentWorkout;
