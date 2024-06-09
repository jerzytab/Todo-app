import React, { useState, useEffect } from 'react';
import './TaskDetails.css';

const TaskDetails = ({ task, onUpdate, onDelete, onClose }) => {
    const [editedTask, setEditedTask] = useState({ ...task });

    useEffect(() => {
        setEditedTask({ ...task });
    }, [task]);

    const handleUpdateTitle = (e) => {
        setEditedTask({ ...editedTask, title: e.target.value });
    };

    const handleUpdateContent = (e) => {
        setEditedTask({ ...editedTask, content: e.target.value });
    };

    const handleSave = async () => {
        if (!editedTask) {
            console.error('Edited task is undefined');
            return;
        }

        try {
            const response = await fetch('http://localhost/backend/updateTask.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: editedTask.id,
                    title: editedTask.title,
                    content: editedTask.content,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            onUpdate(editedTask);
            onClose();
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to update task');
        }
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
                value={editedTask.title}
                onChange={handleUpdateTitle}
            />
            <textarea
                className="task-content"
                value={editedTask.content}
                onChange={handleUpdateContent}
                placeholder="Task details..."
            />
            <button className="save-task" onClick={handleSave}>
                <i className="fas fa-save"></i> Save
            </button>
            <button className="delete-task" onClick={() => onDelete(task)}>
                <i className="fas fa-trash"></i> Delete
            </button>
        </div>
    );
};

export default TaskDetails;
