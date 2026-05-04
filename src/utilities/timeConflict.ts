import type { Course } from '../types/courses';

interface TimeRange{
    start: number;
    end: number;
}

const extractMeeting = (meetingStr: string) => {
    if(!meetingStr || meetingStr.trim() == "") return null;
    
    const [daysPart, timePart] = meetingStr.split(" ");
    return {daysPart, timePart};
};

const TimeToNum = (timeStr: string): number =>{
    const [hrs, mins] = timeStr.split(':').map(Number);
    return hrs * 60 + mins;
};

const parseTimeRange = (timeRangeStr: string): TimeRange =>{
    const [startStr, endStr] = timeRangeStr.split('-');
    return {
        start: TimeToNum(startStr),
        end: TimeToNum(endStr),
    };
};

const parseDays = (daysStr: string) => {
    const symbols = ["M", "Tu", "W", "Th", "F"];
    const res = [];
    let remains = daysStr;
    
    while(remains.length > 0){
        const labels = symbols.find((day) => remains.startsWith(day));
        if(!labels) break;
        res.push(labels);
        remains = remains.slice(labels.length);
    }
    
    return res;
};

const timeOverlap = (r1: TimeRange, r2: TimeRange): boolean => 
    r1.start < r2.end && r2.start < r1.end;

const daysOverlap = (d1: Set<string>, d2: Set<string>): boolean => {
    for(const d of d1){
        if(d2.has(d))   return true;
    }
    return false;    
};

const hasTimeConflict = (c1 : Course, c2 : Course): boolean => {
    if(c1.term !== c2.term) return false;

    const m1 = extractMeeting(c1.meets);
    const m2 = extractMeeting(c2.meets);

    if(!m1 || !m2) return false;
    
    const d1 = new Set(parseDays(m1.daysPart));
    const d2 = new Set(parseDays(m2.daysPart));
    const t1 = parseTimeRange(m1.timePart);
    const t2 = parseTimeRange(m2.timePart);

    return timeOverlap(t1, t2) && daysOverlap(d1, d2);
};

const getConflict = (
    course: Course,
    selectedCourses: Course[]
): boolean => selectedCourses.some((select) => hasTimeConflict(course, select));

export default getConflict