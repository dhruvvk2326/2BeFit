import { NextResponse } from "next/server";
import { User } from "@/models/UserSchema";
import { connect } from "@/db/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { date, durationInHrs } = body;

    if (!date || !durationInHrs) {
      return NextResponse.json({ ok: false, message: "Please provide date and sleep duration" }, { status: 400 });
    }

    // Get the token from the cookie
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ ok: false, message: "No token provided" }, { status: 401 });
    }

    // Verify the token and get the userId
    const userId = await getDataFromToken(token);

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });
    }

    user.sleep.push({
      date: new Date(date),
      durationInHrs,
    });
    await user.save();

    return NextResponse.json({ ok: true, message: "Sleep entry added successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
  }
}
