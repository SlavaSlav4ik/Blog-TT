import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
    value: string;
    onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onSearch }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={value}
                onChange={e => onSearch(e.target.value)}
                placeholder="Поиск по постам..."
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;
