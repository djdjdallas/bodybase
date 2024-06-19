// components/CompleteWorkoutCard.js
import React from "react";

const CompleteWorkoutCard = ({ workout }) => {
  return (
    <div className="workout-card">
      <h2>{workout.name}</h2>
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

export default CompleteWorkoutCard;
