import React, { useState, useEffect } from 'react';
import './TaskDetails.css';

const TaskDetails = ({ task, onUpdate, onDelete, onClose }) => {
    const [editedTask, setEditedTask] = useState({ ...task });

    useEffect(() => {
        setEditedTask({ ...task });
    }, [task]);

    const hasChanges = JSON.stringify(task) !== JSON.stringify(editedTask);

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

        console.log('Sending updated task:', {
            id: editedTask.id,
            title: editedTask.title,
            content: editedTask.content,
        });

        try {
            const response = await fetch('http://localhost/backend/updateTask.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    id: editedTask.id,
                    title: editedTask.title,
                    content: editedTask.content,
                }),
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                if (data.status === 'success') {
                    onUpdate(editedTask);
                    onClose();
                    window.location.reload(); // Odśwież stronę po zapisie
                } else {
                    alert(data.message);
                }
            } else {
                console.error('Network response was not ok');
                alert('Network response was not ok');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Fetch error: ' + error.message);
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
            {hasChanges && (
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
