import React, { useState, useEffect } from 'react';
import './TaskDetails.css';

const TaskDetails = ({ task, onClose, onUpdate, onDelete }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.label);
            setContent(task.content);
        }
    }, [task]);

    const handleUpdateTitle = (e) => {
        setTitle(e.target.value);
        setIsModified(true);
    };

    const handleUpdateContent = (e) => {
        setContent(e.target.value);
        setIsModified(true);
    };

    const handleSave = () => {
        onUpdate({ ...task, label: title, content });
        setIsModified(false);
    };

    if (!task) {
        return null;
    }

    return (
        <div className="task-details">
            <button className="close-task-details" onClick={onClose}>
                <i className="fas fa-times"></i>
            </button>
            <input
                className="task-title"
                value={title}
                onChange={handleUpdateTitle}
            />
            <textarea
                className="task-content"
                value={content}
                onChange={handleUpdateContent}
                placeholder="Task details..."
            />
            {isModified && (
                <button className="save-task" onClick={handleSave}>
                    <i className="fas fa-save"></i> Save
                </button>
            )}
            <button className="delete-task" onClick={() => onDelete(task)}>
                <i className="fas fa-trash"></i> Delete
            </button>
        </div>
    );
};

export default TaskDetails;
