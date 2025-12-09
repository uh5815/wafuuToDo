import { useState, FormEvent } from 'react';
import { FaPlus } from 'react-icons/fa';

interface TodoInputProps {
    onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
    const [text, setText] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
        }
    };

    return (
        <form className="input-group" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="やるべきことを入力..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="btn-add" title="Add Task">
                <FaPlus /> 追加
            </button>
        </form>
    );
}
