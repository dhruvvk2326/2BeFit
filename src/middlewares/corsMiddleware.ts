// middlewares/corsMiddleware.ts
import { NextRequest, NextResponse } from "next/server";
import Cors from "cors";

// Initialize the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST"],
  origin: ["http://your-allowed-domain.com"], // Replace with your allowed domain(s)
});

// Helper function to run middleware
function runMiddleware(req: NextRequest, fn: any) {
  return new Promise((resolve, reject) => {
    fn(
      req,
      {
        end: (result: any) => resolve(result),
        json: (result: any) => resolve(result),
        status: (statusCode: number) => resolve({ statusCode }),
      },
      (result: any) => reject(result)
    );
  });
}

export async function corsMiddleware(req: NextRequest) {
  await runMiddleware(req, cors);
}
