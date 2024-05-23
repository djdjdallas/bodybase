import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { formData } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates meal plans based on user inputs.",
        },
        {
          role: "user",
          content: generatePrompt(formData),
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const mealPlan = response.choices[0].message.content
      .split("\n")
      .filter((line) => line.trim() !== "");

    const mealDataPromises = mealPlan.map((meal) => getMealData(meal));
    const mealData = await Promise.all(mealDataPromises);

    return NextResponse.json(mealData);
  } catch (error) {
    console.error("Error generating meal plan:", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

    return NextResponse.json(
      { error: "Error generating meal plan" },
      { status: 500 }
    );
  }
}

const generatePrompt = (formData) => {
  return `Create a meal plan for someone with the following needs:
  Health Needs: ${formData.healthNeeds}
  Workout Frequency: ${formData.workoutFrequency}
  Dietary Needs: ${formData.dietaryNeeds}
  Meal Plan Duration: ${formData.mealPlanDuration} days.`;
};

const getMealData = async (meal) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${meal}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    const recipe = response.data.results[0];
    return {
      name: recipe.title,
      recipeLink: `https://spoonacular.com/recipes/${recipe.id}`,
      image: recipe.image,
    };
  } catch (error) {
    console.error("Error fetching meal data:", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

    return {
      name: meal,
      recipeLink: "",
      image: "",
    };
  }
};
