import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const bookingData = await request.json();

    // Validate required fields
    if (
      !bookingData.tutorId ||
      !bookingData.tutorName ||
      !bookingData.studentEmail ||
      !bookingData.studentName ||
      !bookingData.phoneNumber
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check tutor availability and session date
    const tutorResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/${bookingData.tutorId}`,
    );
    
    if (!tutorResponse.ok) {
      return NextResponse.json(
        { error: "Tutor not found" },
        { status: 404 }
      );
    }

    const tutor = await tutorResponse.json();

    // Check slot availability
    if (!tutor.totalSlots || tutor.totalSlots <= 0) {
      return NextResponse.json(
        { error: "No available slots left" },
        { status: 400 }
      );
    }

    // Check session date restriction
    if (tutor.sessionStartDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const sessionDate = new Date(tutor.sessionStartDate);
      sessionDate.setHours(0, 0, 0, 0);

      if (today < sessionDate) {
        return NextResponse.json(
          { error: "Booking is not available yet for this tutor" },
          { status: 400 }
        );
      }
    }

    // Create booking
    const bookingResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/booking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingData,
          bookingStatus: "Pending",
          createdAt: new Date().toISOString(),
        }),
      },
    );

    if (!bookingResponse.ok) {
      const errorData = await bookingResponse.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to create booking" },
        { status: 500 }
      );
    }

    const booking = await bookingResponse.json();

    // Update tutor's totalSlots
    const updatedSlots = Math.max(0, (tutor.totalSlots || 0) - 1);
    
    const updateTutorResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/${bookingData.tutorId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalSlots: updatedSlots,
        }),
      },
    );

    if (!updateTutorResponse.ok) {
      // Rollback booking if tutor update fails
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${booking._id}`,
        {
          method: "DELETE",
        },
      );
      return NextResponse.json(
        { error: "Failed to update tutor slots" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        booking,
        updatedSlots,
        message: "Booking created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
