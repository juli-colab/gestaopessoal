
import React, { useState } from 'react';
import { Task } from '../types';

interface EditTaskModalProps {
  task: Task;
  onSave: (id: string, newText: string) => void;
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onSave, onClose }) => {
  const [text, setText] = useState(task.text);

  const handleSave = () => {
    if (text.trim()) {
      onSave(task.id, text.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-secondary w-full max-w-md p-6 rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold mb-4">Editar Tarefa</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-primary border border-secondary rounded-md p-3 h-28 focus:ring-2 focus:ring-accent focus:border-accent"
        />
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="py-2 px-4 bg-primary hover:bg-primary/80 rounded-lg text-sm font-semibold">
            Cancelar
          </button>
          <button onClick={handleSave} className="py-2 px-4 bg-accent hover:bg-sky-400 text-primary rounded-lg text-sm font-bold">
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
