import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './index.css';
import { subscribeReactions } from './features/reactions/reactionsSlice';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

subscribeReactions(store);

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <Provider store={store}>
        <BrowserRouter basename="/Blog-TT">
            <App />
        </BrowserRouter>
    </Provider>
);
