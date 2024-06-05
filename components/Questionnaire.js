"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

const fetchOpenAIRecipeInfo = async (recipeName) => {
  const response = await fetch("/api/openai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: `Give detailed information about the recipe: ${recipeName}`,
    }),
  });

  const data = await response.json();
  return data.text;
};

const Questionnaire = () => {
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      healthNeeds: "",
      workoutFrequency: "",
      dietaryNeeds: "",
      mealPlanDuration: 7,
    },
  });

  const [step, setStep] = useState(1);
  const [recipeInfo, setRecipeInfo] = useState({});
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const onSubmit = (data) => {
    console.log(data);
    setStep(step + 1);
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen bg-[#FAFBFC]">
      <Card className="w-full max-w-md">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>Step 1: Health Needs</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="healthNeeds"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Health Needs" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weight_loss">Weight Loss</SelectItem>
                        <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="improved_health">
                          Improved Health
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <div className="flex justify-center mt-4">
                  <Button type="submit" variant="outline">
                    Next
                  </Button>
                </div>
              </form>
            </CardContent>
          </>
        )}
        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Step 2: Workout Frequency</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="workoutFrequency"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Workout Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="1-2_times_per_week">
                          1-2 times per week
                        </SelectItem>
                        <SelectItem value="3-4_times_per_week">
                          3-4 times per week
                        </SelectItem>
                        <SelectItem value="5+_times_per_week">
                          5+ times per week
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <div className="flex justify-center mt-4">
                  <Button onClick={prevStep} variant="outline" className="mr-2">
                    Back
                  </Button>
                  <Button type="submit">Next</Button>
                </div>
              </form>
            </CardContent>
          </>
        )}
        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle>Step 3: Dietary Needs</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="dietaryNeeds"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Dietary Needs" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="gluten_free">Gluten-Free</SelectItem>
                        <SelectItem value="keto">Keto</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <div className="mt-4">
                  <Controller
                    name="mealPlanDuration"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Meal Plan Duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={3}>3 days</SelectItem>
                          <SelectItem value={5}>5 days</SelectItem>
                          <SelectItem value={7}>7 days</SelectItem>
                          <SelectItem value={14}>14 days</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <Button onClick={prevStep} variant="outline" className="mr-2">
                    Back
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </CardContent>
          </>
        )}
        {step === 4 && (
          <Results formData={getValues()} setRecipeInfo={setRecipeInfo} />
        )}
      </Card>
    </div>
  );
};

const Results = ({ formData, setRecipeInfo }) => {
  const [mealPlan, setMealPlan] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchRecipeDetails = async (id, name) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
      );
      const data = await response.json();
      if (!data) throw new Error("No data returned from Spoonacular API");

      setRecipeDetails((prevDetails) => ({
        ...prevDetails,
        [id]: data,
      }));

      const openAIInfo = await fetchOpenAIRecipeInfo(name);
      setRecipeInfo((prevInfo) => ({
        ...prevInfo,
        [id]: openAIInfo,
      }));
    } catch (error) {
      console.error(`Error fetching details for recipe ${id}:`, error);
    }
  };

  const generateMealPlan = async () => {
    try {
      const response = await fetch("/api/generateMealPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      const data = await response.json();
      const cleanedData = data.map((meal) => ({
        ...meal,
        name: meal.name.replace(/###|[-*]/g, ""),
      }));
      setMealPlan(cleanedData);

      // Fetch additional recipe details from Spoonacular and OpenAI
      for (const meal of cleanedData) {
        if (meal.id && meal.name) {
          await fetchRecipeDetails(meal.id, meal.name);
        } else {
          console.error("Invalid meal data: ", meal);
        }
      }
    } catch (error) {
      console.error("Error generating meal plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (mealPlan) {
      const text = mealPlan
        .map(
          (meal) =>
            `${meal.name}\nView Recipe: ${meal.recipeLink}\n${
              meal.image ? `Image: ${meal.image}` : ""
            }`
        )
        .join("\n\n");
      navigator.clipboard.writeText(text);
      alert("Meal plan copied to clipboard!");
    }
  };

  useEffect(() => {
    generateMealPlan();
  }, []);

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-4xl h-[80vh] overflow-y-auto">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Your Meal Plan</CardTitle>
          <Button variant="outline" onClick={copyToClipboard}>
            Copy Meal Plan
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-pulse"></div>
              </div>
              <p className="mt-2 text-center">Loading...</p>
            </div>
          ) : mealPlan ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mealPlan.map((meal, index) => (
                  <TableRow key={index}>
                    <TableCell className="flex flex-col">
                      <span className="font-medium">{meal.name}</span>
                      {recipeDetails[meal.id] && (
                        <div className="mt-2">
                          <p>
                            <strong>Servings:</strong>{" "}
                            {recipeDetails[meal.id].servings}
                          </p>
                          <p>
                            <strong>Ready in:</strong>{" "}
                            {recipeDetails[meal.id].readyInMinutes} minutes
                          </p>
                          <p>
                            <strong>Ingredients:</strong>
                          </p>
                          <ul className="list-disc list-inside">
                            {recipeDetails[meal.id].extendedIngredients.map(
                              (ingredient) => (
                                <li key={ingredient.id}>
                                  {ingredient.original}
                                </li>
                              )
                            )}
                          </ul>
                          <p>
                            <strong>Instructions:</strong>{" "}
                            {recipeDetails[meal.id].instructions}
                          </p>
                          {recipeInfo[meal.id] && (
                            <p>
                              <strong>Additional Info:</strong>{" "}
                              {recipeInfo[meal.id]}
                            </p>
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="mt-4">
              <p>No meal plan available.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Questionnaire;
