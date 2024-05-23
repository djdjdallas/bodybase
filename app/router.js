// app/router.js or a similar file where you define routes
import { createRouter } from "next/router";
import WorkoutPage from "./dashboard/workout";

const router = createRouter()
  .add(
    "analytics",
    "/dashboard/analytics",
    require("./dashboard/analytics/page")
  )
  .add("workout", "/dashboard/workout", WorkoutPage)
  .add("mealprep", "/dashboard/mealprep", require("./dashboard/mealprep"))
  .add("settings", "/dashboard/settings", require("./dashboard/settings"));

export default router;
