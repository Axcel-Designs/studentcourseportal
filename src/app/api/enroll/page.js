// api/enroll/page.js

import courseData from "@/utils/courses";
import { NextResponse } from "next/server";

export let enrollment = [];

export async function POST(req) {
  const { courseId, studentId, studentName } = await req.json();

  const course = courseData.find((course) => course.id === courseId);

  const newEnrrollment = {
    courseId,
    courseName: course.name,
    studentId,
    studentName,
  };

  enrollment.push(newEnrrollment);

  return NextResponse.json(newEnrrollment, {
    message: "Enrollment successful",
    status: 200,
  });
}

