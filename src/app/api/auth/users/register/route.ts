import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/dbConfig";
import User from "@/models/UserSchema";
import bcryptjs from "bcryptjs";
import { truncate } from "fs";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const { name, email, password, weightInKg, heightInCm, gender, dob, goal, activityLevel } = await req.json();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ ok: false, message: "Email already exists" }, { status: 409 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      password: hashedPassword,
      email,
      weight: [{ weight: weightInKg, date: new Date() }],
      height: [{ height: heightInCm, date: new Date() }],
      gender,
      dob,
      goal,
      isVerified: true,
      activityLevel,
    });
    await newUser.save();

    return NextResponse.json({ ok: true, message: "User registered successfully" }, { status: 201 });
  } catch (err: any) {
    console.error("Error:", err.message);
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}
