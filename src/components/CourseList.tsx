import CourseCard from './CourseCard';
import getConflict from '../utilities/timeConflict';

export type Course = {
  term: string;
  number: string;
  meets: string;
  title: string;
};

export type Courses = Record<string, Course>;

const styles = {
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "18px",
  },
};

interface CourseListProps {
  courses: Courses;
  selectedCourses: Course[];
  toggle: (course: Course) => void;
  onEdit: (course: Course) => void;
}

const CourseList = ({ courses, selectedCourses, toggle, onEdit}: CourseListProps) => (
  <div style={styles.list}>
    {Object.entries(courses).map(([id, course]) => {
      const isSelected = selectedCourses.includes(course);
      const isConflicted = !isSelected && getConflict(course, selectedCourses);
      
      return (
        <CourseCard
          key = {id}
          course = {course}
          selected = {isSelected}
          conflicted = {isConflicted}
          select = {toggle}
          onEdit = {onEdit}
        />
      );
    })}
  </div>
);


export default CourseList;