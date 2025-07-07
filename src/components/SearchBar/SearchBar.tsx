import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import { useDebounce } from '../../app/useDebounce';

interface SearchBarProps {
    value: string; // Redux query
    onSearch: (value: string) => void; // Обновление query
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onSearch }) => {
    // Локально храним ввод пользователя (меняется моментально)
    const [inputValue, setInputValue] = useState(value);

    // Debounce для этого локального значения (ждём, пока пользователь "затихнет")
    const debouncedValue = useDebounce(inputValue, 400);

    // Когда debounce отработал → диспатчим наружу
    useEffect(() => {
        onSearch(debouncedValue); // Только тут передаём наверх
    }, [debouncedValue, onSearch]);

    return (
        <div className="search-bar">
            <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)} // Просто меняем локально
                placeholder="Поиск по постам..."
                className="search-input"
            />
        </div>
    ); //UI → debounce → Redux
};

export default SearchBar;
