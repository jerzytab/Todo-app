import React, { useState, useEffect } from 'react';
import './TaskList.css';
import TaskDetails from './TaskDetails';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost/backend/authenticate.php', {
                method: 'GET',
                credentials: 'include', // Include cookies in the request
            });
            const data = await response.json();
            if (data.status !== 'authenticated') {
                alert('User not authenticated');
                // Redirect to login page or handle unauthenticated state
            }
        } catch (error) {
            console.error('Authentication check failed', error);
        }
    };

    const saveTaskToDB = async (task) => {
        try {
            const response = await fetch('http://localhost/backend/saveTask.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.status === 'success') {
                console.log('Task saved with ID:', data.taskID);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to save task');
        }
    };

    const addTask = () => {
        const newTask = { title: 'Create a Tutorial on Microsoft To Do', description: '' };
        setTasks([newTask, ...tasks]);
        saveTaskToDB(newTask);
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
                            <label>{task.title}</label>
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
