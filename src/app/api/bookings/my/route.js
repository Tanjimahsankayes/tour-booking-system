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

    // Fetch bookings for the logged-in user
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/booking?studentEmail=${encodeURIComponent(email)}`,
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch bookings" },
        { status: 500 }
      );
    }

    const bookings = await response.json();

    return NextResponse.json(
      { bookings },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
