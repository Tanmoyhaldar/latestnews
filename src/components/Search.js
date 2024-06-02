import React from 'react';
import '../styles/Search.css';

export default function Search({
    searchQuery,
    setSearchQuery,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
}) {
    return (
        <div className="container search-container">
            <input
                type="text"
                className="form-control search-input"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="date-inputs">
                {/* <label>From Date</label> */}
                <input
                    title='From Date'
                    type="date"
                    className="form-control search-input"
                    value={fromDate.toISOString().split('T')[0]}
                    onChange={(e) => setFromDate(new Date(e.target.value))}
                />
                {/* <label>To Date</label> */}
                <input
                    title="To Date"
                    type="date"
                    className="form-control search-input"
                    value={toDate.toISOString().split('T')[0]}
                    onChange={(e) => setToDate(new Date(e.target.value))}
                />
            </div>
        </div>
    );
}
