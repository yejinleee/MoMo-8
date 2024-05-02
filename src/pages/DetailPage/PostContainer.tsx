import {  useState } from 'react';
import { PostArticle } from './PostArticle/PostArticle';
import { PostHeader } from './PostHeader';
import { PostTab } from './PostTab';

export const PostContainer = () => {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <>
      <PostHeader />
      <PostTab
        pageNumber={pageNumber}
        handlePostClick={() => setPageNumber(1)}
        handleTimeTableClick={() => setPageNumber(2)}
      />
      <PostArticle
        pageNumber={pageNumber}
      />
    </>
  );
};
