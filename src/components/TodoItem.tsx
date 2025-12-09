import { FaTrash } from 'react-icons/fa';
import { Todo } from '../types';
import { useState, useEffect } from 'react';
import frame1 from '../assets/samurai_frame1.png';
import frame2 from '../assets/samurai_frame2.png';
import frame3 from '../assets/samurai_frame3.png';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    const [animationFrame, setAnimationFrame] = useState<number>(0);
    // 0: idle/none, 1: ready, 2: slash, 3: finish

    useEffect(() => {
        if (todo.completed) {
            // Start animation sequence
            setAnimationFrame(1); // Ready (Sword Up)

            const t1 = setTimeout(() => setAnimationFrame(2), 200); // Slash (Sword Moving)
            const t2 = setTimeout(() => setAnimationFrame(3), 400); // Finish (Sword Down)
            const t3 = setTimeout(() => setAnimationFrame(0), 1200); // Disappear

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
            };
        }
    }, [todo.completed]);

    const getCurrentFrame = () => {
        switch (animationFrame) {
            case 1: return frame1;
            case 2: return frame2;
            case 3: return frame3;
            default: return null;
        }
    };

    const currentImage = getCurrentFrame();

    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''} ${animationFrame > 0 ? 'shake' : ''}`}>
            <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }} className={animationFrame === 2 ? "flash-slash" : ""}>
                {currentImage && <img src={currentImage} alt="Samurai" className="samurai-effect" />}
                <label className="checkbox-container" style={{ marginBottom: 0 }}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggle(todo.id)}
                    />
                    <span className="checkmark"></span>
                </label>
                <span style={{ marginLeft: '12px', flex: 1, wordBreak: 'break-all' }}>
                    {todo.text}
                </span>
                <button className="delete-btn" onClick={() => onDelete(todo.id)} title="Delete">
                    <FaTrash />
                </button>
            </div>
        </li>
    );
}
