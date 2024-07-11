import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserSchema";
import { connect } from "@/db/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log("User ID:", userId);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
