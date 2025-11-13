
import React from 'react';
import { Task } from '../types';
import { EditIcon, TrashIcon } from './icons';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  return (
    <li className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${task.completed ? 'bg-primary/50' : 'bg-primary'}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 rounded text-accent bg-secondary border-secondary focus:ring-accent"
      />
      <span className={`flex-grow mx-4 ${task.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
        {task.text}
      </span>
      <div className="flex items-center gap-2">
        <button onClick={() => onEdit(task)} className="text-text-secondary hover:text-accent p-1 transition-colors">
          <EditIcon />
        </button>
        <button onClick={() => onDelete(task.id)} className="text-text-secondary hover:text-danger p-1 transition-colors">
          <TrashIcon />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
