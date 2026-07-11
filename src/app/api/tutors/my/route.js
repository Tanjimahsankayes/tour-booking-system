import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Get user email from query params (passed from client)
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    // Fetch tutors for the logged-in user
    const response = await fetch(`http://localhost:5000/tutor?email=${email}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch tutors" },
        { status: 500 }
      );
    }

    const tutors = await response.json();

    return NextResponse.json(
      { tutors },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch tutors error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
