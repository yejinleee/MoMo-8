import {  useState } from 'react';
import { PostArticle } from './PostArticle/PostArticle';
import { PostHeader } from './PostHeader';
import { PostTab } from './PostTab';
import styled from '@emotion/styled';

export const PostContainer = () => {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <StDetailContainer>
      <PostHeader />
      <PostTab
        pageNumber={pageNumber}
        handlePostClick={() => setPageNumber(1)}
        handleTimeTableClick={() => setPageNumber(2)}
      />
      <PostArticle
        pageNumber={pageNumber}
      />
    </StDetailContainer>
  );
};


const StDetailContainer = styled.section`
  padding: 32px;
`;