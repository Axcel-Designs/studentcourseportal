// api/enrollment/route.js

import { enrollments } from "@/utils/enrollments";

export async function GET(req) {
  return NextResponse.json(enrollments);
}
