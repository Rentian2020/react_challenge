import { useState } from "react";
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";
import type { Courses, Course } from './CourseList';
import Modal from './Modal';
import CourseEditor from "./CourseEditor";

const terms = ["Fall", "Winter", "Spring"];

const toggleList = <T,>(x: T, lst: T[]): T[] => (
    lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);

const TermPage = ({ courses }: { courses: Courses }) => {
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditingCourse] = useState<Course | null>(null);

  const filtered = Object.fromEntries(
    Object.entries(courses).filter(([, c]) => c.term === selectedTerm)
  );

  const toggle = (course: Course) => {
    setSelectedCourses((prev) => toggleList(course, prev));
  };

  if(editing){
    return (
      <CourseEditor
        course = {editing}
        onCancel = {() => setEditingCourse(null)}
        onSubmit = {() => {}}
      />
    );
  }

  return (
    <div>
      <TermSelector
        options={terms}
        selected={selectedTerm}
        setSelected={setSelectedTerm}
      />

      <CourseList
        courses={filtered}
        selectedCourses={selectedCourses}
        toggle={toggle}
        onEdit={(course) => setEditingCourse(course)}
      />

      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-18 right-10"
        style={{
          padding: "7px 20px",
          borderRadius: 8,
          border: "1px solid #d1d5db",
          background: "#2563eb",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Course Plan
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 style={{ fontWeight: 600, marginBottom: 12 }}>
          Your Course Plan
        </h2>

        {selectedCourses.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No courses selected yet.</p>
        ) : (
          <ul style={{ paddingLeft: "20px" }}>
            {selectedCourses.map((course) => (
              <li
                key={course.number}
                style={{
                  marginBottom: "10px",
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#2563eb",
                  }}
                >
                  {course.term} {course.number}
                </div>

                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {course.title}
                </div>

                <div style={{ fontSize: 13, color: "#6b7280" }}>
                  {course.meets}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </div>
  );
};

export default TermPage;
