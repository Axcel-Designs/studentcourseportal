import courseData from "@/utils/courses";
import { z } from "zod";

export const courseSchema = z.object({
  courseCode: z.string().min(2),
  course: z.string().min(2),
  dept: z.string().optional(),
  instructor: z.string().optional(),
  credits: z.number().int().nonnegative(),
  description: z.string().optional(),
  maxEnrollment: z.number().int().nonnegative(),
  currentEnrollment: z.number().int().nonnegative().default(0),
});

export const enrollSchema = z.object({
  courseCode: z.string(),
  studentId: z.string(),
  studentName: z.string(),
});
