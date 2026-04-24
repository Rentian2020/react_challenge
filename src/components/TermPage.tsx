import { useState } from "react";
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";
import type { Courses } from './CourseList';

const terms = ["Fall", "Winter", "Spring"];

const TermPage = ({courses}: {courses: Courses}) => {
    const [selectedTerm, setSelectedTerm] = useState("Fall");
    
    const filtered = Object.fromEntries(
        Object.entries(courses).filter(([, c]) => c.term === selectedTerm)
    );

    return (
        <div>
            <TermSelector
                options = {terms}
                selected = {selectedTerm}
                setSelected = {setSelectedTerm}
            />
            <CourseList courses = {filtered} />
        </div>
    );
};

export default TermPage;