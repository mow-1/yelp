import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './brand.css';
import './NavBar.css';
import './Home.css';
import './ProductCard.css';
import './LocationPopup.css';
// Tailwind now provides utilities; keep custom files only if needed
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
