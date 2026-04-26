import { useState } from "react";
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";
import type { Courses, Course } from './CourseList';

const terms = ["Fall", "Winter", "Spring"];

const toggleList = <T,>(x: T, lst: T[]): T[] => (
    lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);

const TermPage = ({courses}: {courses: Courses}) => {
    const [selectedTerm, setSelectedTerm] = useState("Fall");
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
    
    const filtered = Object.fromEntries(
        Object.entries(courses).filter(([, c]) => c.term === selectedTerm)
    );

    const toggle = (course: Course) => {
        setSelectedCourses(prev => toggleList(course, prev));
    }

    return (
        <div>
            <TermSelector
                options = {terms}
                selected = {selectedTerm}
                setSelected = {setSelectedTerm}
            />
            <CourseList 
                courses = {filtered}
                selectedCourses = {selectedCourses}
                toggle = {toggle}
            />
        </div>
    );
};

export default TermPage;