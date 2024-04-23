import { useContext, useState } from 'react';
import { PostArticle } from './PostArticle/PostArticle';
import { PostHeader } from './PostHeader';
import { PostTab } from './PostTab';
import PostIdContext from './components/PostIdContext';

export const PostContainer = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const id = useContext(PostIdContext);
  console.log(id);

  return (
    // ? 네이밍을 PostHeader, PostHeader, Post...? 뭐가 좋을까요 ?
    <>
      <PostHeader />
      <PostTab
        pageNumber={pageNumber}
        handlePostClick={() => setPageNumber(1)}
        handleTimeTableClick={() => setPageNumber(2)}
      />
      <PostArticle
        pageNumber={pageNumber}
        response={response.data}
        loginUser={isLogin.user ?? null}
      />
    </>
  );
};
