// utils/workout.js
import { supabase } from "./supabaseClient";

export const getWorkouts = async () => {
  const { data, error } = await supabase.from("workout_plans").select(`
    *,
    exercises (*)
  `);
  if (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
  return data;
};

export const saveWorkout = async (workout) => {
  try {
    const { data, error } = await supabase
      .from("workout_plans")
      .insert([workout]);
    if (error) throw error;

    const workoutId = data[0].id;
    const exercises = workout.exercises.map((exercise) => ({
      ...exercise,
      workout_plan_id: workoutId,
    }));

    const { data: exercisesData, error: exercisesError } = await supabase
      .from("exercises")
      .insert(exercises);
    if (exercisesError) throw exercisesError;

    return { workout: data[0], exercises: exercisesData };
  } catch (error) {
    console.error("Error saving workout:", error);
    throw error;
  }
};
