import React from 'react';
import './TaskList.css';

const TaskList = () => {
    return (
        <div className="task-list">
            <h2 className="task-list-title">My Day</h2>
            <div className="task">
                <input type="checkbox" />
                <label>Create a Tutorial on Microsoft To Do</label>
            </div>
            <button className="add-task">
                <i className="fas fa-plus"></i> Add a Task
            </button>
        </div>
    );
};

export default TaskList;
