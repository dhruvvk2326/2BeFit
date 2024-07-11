import { connect } from "@/db/dbConfig";
import User from "@/models/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }
    console.log("user exists");

    //check if password is correct
    console.log("Stored hashed password:", user.password);
    console.log("Provided password:", password);

    const validPassword = await bcryptjs.compare(password, user.password);
    console.log("Password comparison result:", validPassword);
    if (!validPassword) {
      console.error("Password validation failed for user:", user.email);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "1d" });

    const response = NextResponse.json({
      ok: true,
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
