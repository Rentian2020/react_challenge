import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const courseNum = /^\d+(-\d)?$/;
const meeting = /^(M|T|W|Th|F)+ \d{2}:\d{2}-\d{2}:\d{2}$/

const Course = z.object({
    title: z.string().trim().min(2, 'Title must be at least 2 characters'),
    term: z.enum(['Fall', 'Winter', 'Spring', 'Summer'], {error: 'Term must be Fall, Winter, or Spring'}),
    number: z.string().regex(courseNum, 'Course number must be a number with optional section, e.g., "213-2"'),
    meets: z.union([
        z.literal(''),
        z.string().regex(meeting, 'Must contain days and start-end, e.g., MWF 12:00-13:20')
    ])
})

export type Course = z.infer<typeof Course>;
export const courseResolver = zodResolver(Course);