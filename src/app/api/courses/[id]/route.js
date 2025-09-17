// api/enroll/[id]/route.js

import courseData from "@/utils/courses";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  const course = courseData.find((course) => course.id === parseInt(id));
  if (!course) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }
  return NextResponse.json(course, {
    headers: { "content-Type": "application/json" },
  });
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const i = courseData.findIndex((course) => course.id === parseInt(id));
  if (i === -1) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }
  try {
    const {
      courseCode,
      course,
      dept,
      instructor,
      credits,
      description,
      maxEnrollment,
      currentEnrollment,
    } = await req.json();

    courseData[i] = {
      ...courseData[i],
      courseCode,
      course,
      dept,
      instructor,
      credits,
      description,
      maxEnrollment,
      currentEnrollment,
    };
    return NextResponse.json(courseData[i], {
      status: 200,
      headers: { "content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const index = courseData.findIndex((course) => course.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }
  try {
    courseData.splice(index, 1);
    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200, headers: { "content-Type": "application/json" } }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }

}
