import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserSchema";
import { verify } from "jsonwebtoken";
import { connect } from "@/db/dbConfig";
import axios from "axios";

require("dotenv").config();

connect();

export async function POST(req: NextRequest) {
  try {
    const { item, date, quantity, quantitytype } = await req.json();

    if (!item || !date || !quantity || !quantitytype) {
      return NextResponse.json({ error: "Please provide all the details" }, { status: 400 });
    }

    let qtyingrams = 0;
    switch (quantitytype) {
      case "g":
      case "ml":
        qtyingrams = quantity;
        break;
      case "kg":
      case "l":
        qtyingrams = quantity * 1000;
        break;
      default:
        return NextResponse.json({ error: "Invalid quantity type" }, { status: 400 });
    }

    // Get the authToken from cookies
    const authToken = req.cookies.get("token")?.value;

    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized: No authToken provided" }, { status: 401 });
    }

    const decoded = await new Promise((resolve, reject) => {
      verify(authToken, process.env.JWT_SECRET_KEY!, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });

    if (!decoded || typeof decoded !== "object" || !("email" in decoded)) {
      return NextResponse.json({ error: "Unauthorized: Invalid authToken" }, { status: 401 });
    }

    const userEmail = decoded.email;

    // Find the user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Call external API to get calorie information using axios with limit query parameter
    const url = `https://dietagram.p.rapidapi.com/apiFood.php`;
    const options = {
      params: {
        name: item,
        lang: "en",
        limit: 1, // Limiting to 1 result (only the first dish)
      },
      headers: {
        "x-rapidapi-key": "cdef5285damshb732769a69144afp1309b5jsn7e7deb4f8663",
        "x-rapidapi-host": "dietagram.p.rapidapi.com",
      },
    };

    const response = await axios.get(url, options);
    const body = response.data;

    // Ensure at least one dish is found
    if (!body.dishes || body.dishes.length === 0) {
      throw new Error("No dish found in the API response");
    }

    // Extract the first dish and its caloric value
    const firstDish = body.dishes[0];
    const caloricValue = parseFloat(firstDish.caloric);

    // Calculate calorie intake based on quantity and serving size
    const calorieIntake = (caloricValue / 100) * qtyingrams;

    // Add calorie intake to user's data
    user.calorieIntake.push({
      item: firstDish.name,
      date: new Date(date),
      quantity,
      quantitytype,
      calorieIntake: Math.round(calorieIntake),
    });

    await user.save();

    return NextResponse.json({ data: "Calorie intake added successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
