import TodoItem from './TodoItem';
import { Todo } from '../types';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
    if (todos.length === 0) {
        return (
            <div style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
                <p>タスクはありません。<br />"Nothing remains."</p>
            </div>
        );
    }

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}
