import dotenv from 'dotenv';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

dotenv.config();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
