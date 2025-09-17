import { enrollment } from "../enroll/page";

export async function GET(req) {
  return NextResponse.json(enrollment)
}