import CourseCard from './CourseCard';

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
}

const CourseList = ({ courses, selectedCourses, toggle }: CourseListProps) => (
  <div style={styles.list}>
    {Object.entries(courses).map(([id, course]) => (
      <CourseCard
        key={id}
        course={course}
        selected={selectedCourses.includes(course)}
        select={toggle}
      />
    ))}
  </div>
);

export default CourseList;