import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const updateData = await request.json();

    // Validate required fields
    if (!updateData.bookingStatus) {
      return NextResponse.json(
        { error: "Booking status is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to update booking" },
        { status: 500 }
      );
    }

    const updatedBooking = await response.json();

    return NextResponse.json(
      { booking: updatedBooking, message: "Booking updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
