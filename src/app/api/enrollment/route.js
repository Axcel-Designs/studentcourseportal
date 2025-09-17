// api/enrollment/route.js

import { enrollments } from "../enroll/route";

export async function GET(req) {
  return NextResponse.json(enrollments);
}
