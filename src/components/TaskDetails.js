import React, { useState } from 'react';
import './TaskDetails.css';

const TaskDetails = () => {
    const [title, setTitle] = useState('Create a Tutorial on Microsoft To Do');
    const [content, setContent] = useState('');

    return (
        <div className="task-details">
            <input
                className="task-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="task-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Task details..."
            />
            <button className="delete-task">
                <i className="fas fa-trash"></i> Delete
            </button>
        </div>
    );
};

export default TaskDetails;
