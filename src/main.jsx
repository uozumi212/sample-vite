import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StudyInput } from './App'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudyInput />
  </StrictMode>
);
