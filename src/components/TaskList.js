import React, { useState } from 'react';
import './TaskList.css';
import TaskDetails from './TaskDetails';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const addTask = () => {
        const newTask = { label: 'Create a Tutorial on Microsoft To Do', content: '' };
        setTasks([newTask, ...tasks]);
    };

    const selectTask = (task) => {
        setSelectedTask(task);
    };

    const closeTaskDetails = () => {
        setSelectedTask(null);
    };

    const handleUpdateTask = (updatedTask) => {
        const updatedTasks = tasks.map((task) =>
            task === selectedTask ? updatedTask : task
        );
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (taskToDelete) => {
        const updatedTasks = tasks.filter((task) => task !== taskToDelete);
        setTasks(updatedTasks);
        setSelectedTask(null); // Jeśli usuwamy aktualnie wybrany task, wybierzemy null
    };

    return (
        <div className="task-list-container">
            <div className="task-list-wrapper">
                <div className="task-list">
                    {tasks.map((task, index) => (
                        <div className="task" key={index} onClick={() => selectTask(task)}>
                            <input type="checkbox"/>
                            <label>{task.label}</label>
                        </div>
                    ))}
                </div>
                <div className="add-task-container">
                    <button className="add-task" onClick={addTask}>
                        <i className="fas fa-plus"></i> Add a Task
                    </button>
                </div>
            </div>
            {selectedTask && (
                <div className="task-details-container">
                    <TaskDetails
                        task={selectedTask}
                        onUpdate={handleUpdateTask}
                        onDelete={handleDeleteTask} // Przekazujemy funkcję usuwania
                        onClose={closeTaskDetails}
                    />
                </div>
            )}
        </div>
    );
};

export default TaskList;
