import React from "react";

const WorkoutBreakdown = ({ workout }) => {
  if (!workout.exercises) {
    return <p>No exercises found for this workout.</p>;
  }

  return (
    <div>
      <h2>{workout.name} Breakdown</h2>
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

export default WorkoutBreakdown;
