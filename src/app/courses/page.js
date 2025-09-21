"use client";
import { useEffect, useState } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      });
  }, []);

  async function handleEnroll(courseCode) {
    const res = await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseCode,
        studentId: "S123", // hardcoded student for now
        studentName: "John Doe",
      }),
    });
    const data = await res.json();
    alert(JSON.stringify(data, null, 2));
  }

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Available Courses</h1>
      {courses.map((course) => (
        <div
          key={course.id}
          className="border p-4 rounded-lg shadow flex justify-between items-center"
        >
          <div>
            <h2 className="font-semibold">{course.title}</h2>
            <p className="text-sm text-gray-600">{course.courseCode}</p>
            <p className="text-sm">{course.description}</p>
            <p className="text-xs text-gray-500">
              {course.currentEnrollment}/{course.maxEnrollment} enrolled
            </p>
          </div>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            onClick={() => handleEnroll(course.courseCode)}
          >
            Enroll
          </button>
        </div>
      ))}
    </div>
  );
}
