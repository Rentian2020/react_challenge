import { useForm } from 'react-hook-form';
import type { Course } from './CourseList';

interface CourseEditorProps {
    course: Course;
    onCancel: () => void;
    onSubmit: () => void;
}

const CourseEditor = ({ course, onCancel, onSubmit: _onSubmit }: CourseEditorProps) => {
    const {register, handleSubmit} = useForm<Course>({
        defaultValues: {
            term: course.term,
            number: course.number,
            meets: course.meets,
            title: course.title,
        },
        mode: 'onChange',
    });

    return (
        <form
            onSubmit={handleSubmit(() => {})}
            style={{
                background: "white",
                borderRadius: "14px",
                padding: "24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                maxWidth: "480px",
                margin: "40px auto",
            }}
        >
            <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px", color: "#111827" }}>
                Edit course
            </h2>

            {(["term", "number", "meets", "title"] as const).map((field) => (
                <div key={field} style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "13px", color: "#6b7280", marginBottom: "6px", textTransform: "capitalize" }}>
                        {field}
                    </label>
                    <input
                        type="text"
                        {...register(field)}
                        style={{
                            width: "100%",
                            boxSizing: "border-box",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db",
                            fontSize: "14px",
                            outline: "none",
                        }}
                    />
                </div>
            ))}

            <button
                type="button"
                onClick={onCancel}
                style={{
                    marginTop: "8px",
                    width: "100%",
                    padding: "9px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    background: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    color: "#374151",
                }}
            >
                Cancel
            </button>
        </form>
    );
};

export default CourseEditor;