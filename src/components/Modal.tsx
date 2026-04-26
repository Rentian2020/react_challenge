import { type PropsWithChildren } from 'react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({ isOpen, onClose, children }: PropsWithChildren<ModalProps>) => (
    !isOpen ? null : (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black/75"
            onClick={onClose}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: "#fff",
                    borderRadius: 8,
                    border: "1px solid #d1d5db",
                    padding: "24px 24px 70px",
                    maxWidth: 400,
                    width: "100%",
                    position: "relative",
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 12,
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: 16,
                    }}
                >
                    ✕
                </button>
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "7px 20px",
                        borderRadius: 8,
                        border: "1px solid #d1d5db",
                        background: "transparent",
                        color: "#6b7280",
                        fontWeight: 400,
                        cursor: "pointer",
                    }}
                >
                    ✕ Close
                </button>
                {children}
            </div>
        </div>
    )
);

export default Modal;