// app/api/report/route.js

import { NextResponse } from "next/server";
import User from "@/models/UserSchema";
import { verify } from "jsonwebtoken";

export async function GET(req) {
  const authToken = req.cookies.get("token")?.value;

  if (!authToken) {
    return NextResponse.json({ error: "Unauthorized: No authToken provided" }, { status: 401 });
  }

  try {
    const decoded = await new Promise((resolve, reject) => {
      verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });

    if (!decoded || typeof decoded !== "object" || !("email" in decoded)) {
      return NextResponse.json({ error: "Unauthorized: Invalid authToken" }, { status: 401 });
    }

    const userEmail = decoded.email;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Logic to fetch and prepare report data
    const today = new Date();
    let calorieIntake = 0;
    let sleep = 0;
    let water = 0;
    let steps = 0;
    let weight = user.weight[user.weight.length - 1].weight;

    user.calorieIntake.forEach((entry) => {
      const entryDate = new Date(entry.date);
      if (entryDate.getDate() === today.getDate() && entryDate.getMonth() === today.getMonth() && entryDate.getFullYear() === today.getFullYear()) {
        calorieIntake += entry.calorieIntake;
      }
    });

    user.sleep.forEach((entry) => {
      const entryDate = new Date(entry.date);
      if (entryDate.getDate() === today.getDate() && entryDate.getMonth() === today.getMonth() && entryDate.getFullYear() === today.getFullYear()) {
        sleep += entry.durationInHrs;
      }
    });

    user.water.forEach((entry) => {
      const entryDate = new Date(entry.date);
      if (entryDate.getDate() === today.getDate() && entryDate.getMonth() === today.getMonth() && entryDate.getFullYear() === today.getFullYear()) {
        water += entry.amountInMilliliters;
      }
    });

    user.steps.forEach((entry) => {
      const entryDate = new Date(entry.date);
      if (entryDate.getDate() === today.getDate() && entryDate.getMonth() === today.getMonth() && entryDate.getFullYear() === today.getFullYear()) {
        steps += entry.steps;
      }
    });

    const weightInKg = parseFloat(user.weight[user.weight.length - 1].weight);
    const age = new Date().getFullYear() - new Date(user.dob).getFullYear();
    const gender = user.gender;

    let BMR = gender === "male" ? 88.362 + 13.397 * weightInKg + 4.799 * 160 - 5.677 * age : 447.593 + 9.247 * weightInKg + 3.098 * 160 - 4.33 * age;

    const maxCalorieIntake = user.goal === "weightLoss" ? BMR - 500 : user.goal === "weightGain" ? BMR + 500 : BMR;

    const goalWeight = 22 * (user.height[user.height.length - 1].height / 100) ** 2;
    const goalSteps = user.goal === "weightLoss" ? 10000 : user.goal === "weightGain" ? 5000 : 7500;

    const reportData = [
      { name: "Calorie Intake", value: calorieIntake, goal: maxCalorieIntake, unit: "cal" },
      { name: "Sleep", value: sleep, goal: 6, unit: "hrs" },
      { name: "Steps", value: steps, goal: goalSteps, unit: "steps" },
      { name: "Water", value: water, goal: 4000, unit: "ml" },
      { name: "Weight", value: weight, goal: goalWeight, unit: "kg" },
    ];

    return NextResponse.json({ ok: true, message: "Report", data: reportData });
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json({ error: "Failed to fetch report" }, { status: 500 });
  }
}
