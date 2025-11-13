
import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { PlusIcon } from './icons';
import TaskItem from './TaskItem';
import EditTaskModal from './EditTaskModal';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage", error);
    }
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: newTaskText,
      completed: false,
    };
    setTasks(prev => [newTask, ...prev]);
    setNewTaskText('');
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setTaskToEdit(null);
    setIsEditModalOpen(false);
  };
  
  const updateTask = (id: string, newText: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
    closeEditModal();
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="max-w-3xl mx-auto bg-secondary p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-accent">Gerenciador de Tarefas</h2>
      <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTaskText}
          onChange={e => setNewTaskText(e.target.value)}
          placeholder="Adicionar nova tarefa..."
          className="flex-grow bg-primary border border-secondary rounded-lg p-3 focus:ring-2 focus:ring-accent focus:border-accent"
        />
        <button type="submit" className="bg-highlight hover:bg-indigo-700 text-white font-bold p-3 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105">
          <PlusIcon />
        </button>
      </form>
      
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-text-secondary border-b border-primary pb-2">Pendentes ({pendingTasks.length})</h3>
        {pendingTasks.length > 0 ? (
          <ul className="space-y-2">
            {pendingTasks.map(task => (
              <TaskItem key={task.id} task={task} onToggle={toggleTaskCompletion} onDelete={deleteTask} onEdit={openEditModal} />
            ))}
          </ul>
        ) : (
          <p className="text-text-secondary text-center py-4">Ótimo! Nenhuma tarefa pendente.</p>
        )}
      </div>

      {completedTasks.length > 0 && (
        <div className="space-y-4 mt-8">
          <h3 className="font-semibold text-lg text-text-secondary border-b border-primary pb-2">Concluídas ({completedTasks.length})</h3>
          <ul className="space-y-2">
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} onToggle={toggleTaskCompletion} onDelete={deleteTask} onEdit={openEditModal} />
            ))}
          </ul>
        </div>
      )}

      {isEditModalOpen && taskToEdit && (
        <EditTaskModal
          task={taskToEdit}
          onSave={updateTask}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default TaskManager;
