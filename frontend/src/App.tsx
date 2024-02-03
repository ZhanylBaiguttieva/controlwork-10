
import './App.css';
import {Route, Routes} from 'react-router-dom';
import News from './components/News.tsx';
import PostForm from './components/Form/PostForm.tsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={(<News/>)} />
        <Route path="/new-post" element={(<PostForm/>)} />
      </Routes>
    </>
  );
}

export default App;
