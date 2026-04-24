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

const CourseList = ({ courses }: { courses: Courses }) => (
  <div style={styles.list}>
    {Object.entries(courses).map(([id, course]) => (
      <div
        key={id}
        style={styles.card}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
        }}
      >
        <span style={styles.badge}>
          {course.term} {course.number}
        </span>
        <p style={styles.courseTitle}>{course.title}</p>
        <p style={styles.meets}>{course.meets}</p>
      </div>
    ))}
  </div>
);

export default CourseList;