import React, { useState, useEffect } from 'react';
import './TaskList.css';
import TaskDetails from './TaskDetails';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost/backend/getTasks.php', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.status === 'success') {
                const tasksWithMappedFields = data.tasks.map(task => ({
                    ...task,
                    content: task.description // Map description to content
                }));
                setTasks(tasksWithMappedFields);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const addTask = async () => {
        const newTask = { title: 'New Task', description: '', status: 'TO_DO' };
        try {
            const response = await fetch('http://localhost/backend/saveTask.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.status === 'success') {
                fetchTasks();
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const selectTask = (task) => {
        const selectedTaskWithId = { ...task, id: task.ID };
        setSelectedTask(selectedTaskWithId);
    };

    const closeTaskDetails = () => {
        setSelectedTask(null);
    };

    const handleUpdateTask = async (updatedTask) => {
        try {
            const response = await fetch('http://localhost/backend/updateTask.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.status === 'success') {
                fetchTasks();
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleDeleteTask = async (taskToDelete) => {
        try {
            const response = await fetch('http://localhost/backend/deleteTask.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id: taskToDelete.ID }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.status === 'success') {
                setTasks(tasks.filter(task => task.ID !== taskToDelete.ID));
                setSelectedTask(null);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleStatusChange = async (task) => {
        const updatedStatus = task.status === 'DONE' ? 'TO_DO' : 'DONE';
        const updatedTask = { ...task, status: updatedStatus };

        try {
            const response = await fetch('http://localhost/backend/updateTaskStatus.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ ID: task.ID, Status: updatedStatus }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.status === 'success') {
                setTasks(tasks.map(t => (t.ID === task.ID ? updatedTask : t)));
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <div className="task-list-container">
            <div className="task-list-wrapper">
                <div className="task-list">
                    {tasks.map((task) => (
                        <div
                            className={`task ${selectedTask && selectedTask.ID === task.ID ? 'selected' : ''}`}
                            key={task.ID}
                            onClick={() => selectTask(task)}
                        >
                            <input
                                type="checkbox"
                                checked={task.status === 'DONE'}
                                onChange={() => handleStatusChange(task)}
                            />
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
                        onDelete={handleDeleteTask}
                        onClose={closeTaskDetails}
                    />
                </div>
            )}
        </div>
    );
};

export default TaskList;
