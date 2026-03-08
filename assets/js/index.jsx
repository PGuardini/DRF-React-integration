import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import Article from './components/Article';

const renderApp = () => {
    
    const rootElement = document.getElementById('root');
    if (rootElement){
        const root = createRoot(rootElement);
        root.render(
            <StrictMode>
                <Article />
            </StrictMode>
        );
    } else {
        console.error('Elemento com id=root não encontrado')
    }
}

if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', renderApp)
} else {
    renderApp()
}