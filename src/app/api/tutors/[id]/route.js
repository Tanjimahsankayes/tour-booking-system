import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const updateData = await request.json();

    // Validate required fields
    if (!updateData.name || !updateData.subject) {
      return NextResponse.json(
        { error: "Name and subject are required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/${id}`,
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
        { error: errorData.message || "Failed to update tutor" },
        { status: 500 }
      );
    }

    const updatedTutor = await response.json();

    return NextResponse.json(
      { tutor: updatedTutor, message: "Tutor updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update tutor error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to delete tutor" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Tutor deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete tutor error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
