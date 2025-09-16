import courseData from "@/utils/courses"

export let enrollment = []
 const {courseId, studentId, studentName, } = await req.json()

const course = courseData.find((course) => course.id === courseId)

export async function POST(req) {
  
}