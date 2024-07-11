import { NextResponse } from "next/server";
import { User } from "@/models/UserSchema";
import { connect } from "@/db/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { date, waterAmount } = body;

    if (!date || !waterAmount) {
      return NextResponse.json({ ok: false, message: "Please provide date and water amount" }, { status: 400 });
    }

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ ok: false, message: "No token provided" }, { status: 401 });
    }

    const userId = await getDataFromToken(token);
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });
    }

    user.water.push({
      date: new Date(date),
      amount: waterAmount,
    });
    await user.save();

    return NextResponse.json({ ok: true, message: "Water entry added successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
  }
}
