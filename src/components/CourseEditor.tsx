import { useForm } from 'react-hook-form';
import { courseResolver, type Course } from '../types/courses';
import { updateData } from '../utilities/firebase';

interface CourseEditorProps {
    course: Course;
    courseId: string;
    onCancel: () => void;
    onSubmit: () => void;
}

const CourseEditor = ({ course, courseId, onCancel, onSubmit }: CourseEditorProps) => {
    const { register, handleSubmit, formState: { errors, isDirty } } = useForm<Course>({
        defaultValues: {
            term: course.term,
            number: course.number,
            meets: course.meets,
            title: course.title,
        },
        mode: 'onChange',
        resolver: courseResolver,
    });

    const onSave = async (data: Course) => {
        await updateData(`/courses/${courseId}`, data);
        onSubmit();
    };

    return (
        <form
            onSubmit={handleSubmit(onSave)}
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

            <label style={{ display: "block", marginBottom: "14px" }}>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>Title</span>
                {errors.title && <span style={{ color: "red", fontSize: "12px", marginLeft: "8px", fontStyle: "italic" }}>{errors.title.message}</span>}
                <input type="text" {...register("title")}
                    style={{ display: "block", width: "100%", boxSizing: "border-box", padding: "8px 12px", borderRadius: "8px", border: errors.title ? "1px solid red" : "1px solid #d1d5db", fontSize: "14px", marginTop: "6px" }}
                />
            </label>

            <label style={{ display: "block", marginBottom: "14px" }}>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>Term</span>
                {errors.term && <span style={{ color: "red", fontSize: "12px", marginLeft: "8px", fontStyle: "italic" }}>{errors.term.message}</span>}
                <input type="text" {...register("term")}
                    style={{ display: "block", width: "100%", boxSizing: "border-box", padding: "8px 12px", borderRadius: "8px", border: errors.term ? "1px solid red" : "1px solid #d1d5db", fontSize: "14px", marginTop: "6px" }}
                />
            </label>

            <label style={{ display: "block", marginBottom: "14px" }}>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>Number</span>
                {errors.number && <span style={{ color: "red", fontSize: "12px", marginLeft: "8px", fontStyle: "italic" }}>{errors.number.message}</span>}
                <input type="text" {...register("number")}
                    style={{ display: "block", width: "100%", boxSizing: "border-box", padding: "8px 12px", borderRadius: "8px", border: errors.number ? "1px solid red" : "1px solid #d1d5db", fontSize: "14px", marginTop: "6px" }}
                />
            </label>

            <label style={{ display: "block", marginBottom: "14px" }}>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>Meets</span>
                {errors.meets && <span style={{ color: "red", fontSize: "12px", marginLeft: "8px", fontStyle: "italic" }}>{errors.meets.message}</span>}
                <input type="text" {...register("meets")}
                    style={{ display: "block", width: "100%", boxSizing: "border-box", padding: "8px 12px", borderRadius: "8px", border: errors.meets ? "1px solid red" : "1px solid #d1d5db", fontSize: "14px", marginTop: "6px" }}
                />
            </label>

            <button type="submit" 
                    disabled={!isDirty}
                    style={{ marginTop: "8px", width: "100%", padding: "9px", borderRadius: "8px", border: "none", background: "#2563eb", color: "white", fontSize: "14px", fontWeight: 600, cursor: isDirty ? "pointer" : "not-allowed", opacity: isDirty ? 1 : 0.5 }}>
                Submit
            </button>
            <button type="button" onClick={onCancel} style={{ marginTop: "8px", width: "100%", padding: "9px", borderRadius: "8px", border: "1px solid #d1d5db", background: "white", fontSize: "14px", fontWeight: 600, cursor: "pointer", color: "#374151" }}>
                Cancel
            </button>
        </form>
    );
};

export default CourseEditor;