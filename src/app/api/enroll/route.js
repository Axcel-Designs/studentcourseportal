// api/enroll/route.js

import courseData from "@/utils/courses";
import { enrollments } from "@/utils/enrollments";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseCode, studentId, studentName } = await req.json();
  
  const course = courseData.find((c) => c.courseCode === courseCode);
  
  if (!course)
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  
  if (course.currentEnrollment >= course.maxEnrollment)
    return NextResponse.json({ message: "Course is full" }, { status: 400 });
  
  const alreadyEnrolled = enrollments.some(
    (enroll) =>
      enroll.studentId === studentId && enroll.courseCode === courseCode
  );
  
  if (alreadyEnrolled) {
    return NextResponse.json(
      { error: "Student already enrolled in this course" },
      { status: 400 }
    );
  }
  
  const newEnrollment = {
    studentId,
    studentName,
    courseId: course.id,
    courseCode: courseCode,
    courseName: course.course,
    status: "enrolled",
    enrolledAt: new Date().toISOString(),
  };
  
  enrollments.push(newEnrollment);
  
  course.currentEnrollment += 1;
  return NextResponse.json(newEnrollment, {
    message: "Enrollment successful",
    status: 200,
  });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");
  
  if (!studentId) {
    return NextResponse.json(
      { error: "studentId query param is required" },
      { status: 400 }
    );
  }
  
  const studentEnrollments = enrollments.filter(
    (enroll) => enroll.studentId === studentId
  );
  
  return NextResponse.json(studentEnrollments, { status: 200 });
}

export async function DELETE(req) {
  const { courseCode, studentId, } = await req.json();
  const index = enrollments.findIndex(
     (enroll) =>
       enroll.studentId === studentId && enroll.courseCode === courseCode
   );

   if (index === -1) {
     return NextResponse.json(
       { error: "Enrollment not found" },
       { status: 404 }
     );
   }

   const removed = enrollments.splice(index, 1)[0];

   const course = courseData.find((c) => c.courseCode === courseCode);
   if (course && course.currentEnrollment > 0) {
     course.currentEnrollment -= 1;
   }

   return NextResponse.json(
     { message: "Unenrolled successfully", removed },
     { status: 200 }
   );
}
