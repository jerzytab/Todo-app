import React, { useState } from 'react';
import './FilterModal.css';

const FilterModal = ({ filters, onClose, onApply }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters({ ...localFilters, [name]: value });
    };

    const handleSubmit = () => {
        onApply(localFilters);
        onClose();
    };

    return (
        <div className="filter-modal-backdrop" onClick={onClose}>
            <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
                <div className="filter-modal-header">
                    <h2>Filter Tasks</h2>
                </div>
                <div className="filter-modal-body">
                    <label>Status:</label>
                    <select name="status" value={localFilters.status} onChange={handleChange}>
                        <option value="ALL">All</option>
                        <option value="TO_DO">To Do</option>
                        <option value="DONE">Done</option>
                    </select>
                    <label>Creation Date:</label>
                    <input
                        type="date"
                        name="creationDate"
                        value={localFilters.creationDate}
                        onChange={handleChange}
                    />
                    <label>Due Date:</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={localFilters.dueDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="filter-modal-footer">
                    <button onClick={handleSubmit}>Search</button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
