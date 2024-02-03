
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Posts from './components/Posts/Posts.tsx';
import PostForm from './components/Form/PostForm.tsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={(<Posts/>)} />
        <Route path="/new-post" element={(<PostForm/>)} />
      </Routes>
    </>
  );
}

export default App;
