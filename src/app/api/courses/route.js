import courseData from "@/utils/courses";
import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json(courseData);
}

export async function POST(req) {
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

    const newCourse = {
      id:
        courseData.length === 0 ? 1 : courseData[courseData.length - 1].id + 1,
      courseCode: courseCode,
      course: course,
      dept: dept,
      instructor: instructor,
      credits: credits,
      description: description,
      maxEnrollment: maxEnrollment,
      currentEnrollment: currentEnrollment,
    };
    courseData.push(newCourse);
    return NextResponse.json(newCourse, {
      status: 201,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Invalid" },
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }
}
