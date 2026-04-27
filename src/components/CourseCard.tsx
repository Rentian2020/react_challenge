import type { Course } from './CourseList';

interface CourseCardProps {
  course: Course;
  selected: boolean;
  conflicted: boolean;
  select: (course: Course) => void;
}

const styles = {
  card: {
    background: "white",
    borderRadius: "14px",
    padding: "18px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "all 0.2s ease",
    cursor: "pointer",
  },
  badge: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#2563eb",
    background: "#e0e7ff",
    padding: "4px 10px",
    borderRadius: "999px",
  },
  courseTitle: {
    fontSize: "15px",
    fontWeight: 600,
    marginTop: "10px",
  },
  meets: {
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "6px",
  },
};

const CourseCard = ({ course, selected, conflicted, select }: CourseCardProps) => (
  <div
    style={{
      ...styles.card,
      border: selected ? "2px solid #2563eb" : "2px solid transparent",
      background: selected ? "#eff6ff" : "white",
      opacity: conflicted ? 0.5 : 1,
      cursor: conflicted ? "not-allowed" : "pointer",
    }}
    onClick={() => !conflicted && select(course)}
    onMouseEnter={(e) => { if(!conflicted) e.currentTarget.style.transform = "translateY(-4px)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
  >
    <span style={styles.badge}>
      {course.term} {course.number}
    </span>
    <p style={styles.courseTitle}>{course.title}</p>
    <p style={styles.meets}>{course.meets}</p>
    {conflicted && <p style={{ color: "#dc2626", fontSize: "15px", marginTop: "6px" }}>✕ Time conflict</p>}
  </div>
);

export default CourseCard;