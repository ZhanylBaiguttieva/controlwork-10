
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Posts from './components/Posts/Posts.tsx';
import PostForm from './components/Form/PostForm.tsx';
import {useAppDispatch} from './app/hooks.ts';
import {PostMutation} from './types';
import {createPost, fetchPosts} from './containers/posts/postsThunks.ts';
import PostInfo from './components/Posts/PostInfo.tsx';

function App() {
  const dispatch = useAppDispatch();
  const onFormSubmit = async (postMutation: PostMutation) => {
    await dispatch(createPost(postMutation));
    await dispatch(fetchPosts());
  };

  return (
    <>
      <Routes>
        <Route path="/" element={(<Posts/>)} />
        <Route path="/news" element={(<Posts/>)} />
        <Route path="/new-post" element={(<PostForm onSubmit={onFormSubmit}/>)} />
        <Route path="/news/:id" element={(<PostInfo/>)} />
      </Routes>
    </>
  );
}

export default App;
