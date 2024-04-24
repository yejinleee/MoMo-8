import styled from '@emotion/styled';
import { Badge } from './Badge';
import { PostContents } from './PostContents';
import { PostIcon } from './PostIcon';
import { IPostTitleCustom } from '@/api/_types/apiModels';
import { useGetPostDetail } from '@/hooks/query/usePost';
import { useContext } from 'react';
import PostIdContext from '../components/PostIdContext';
import { TimeTable } from './TimeTable/TimeTable';

interface PostArticleProps {
  pageNumber: number;
}

export const PostArticle = ({
  pageNumber,
}: PostArticleProps) => {
  const postId = useContext(PostIdContext);

  const { data } = useGetPostDetail(postId || '');
  const response = data.data

  const title = JSON.parse(response.title) as IPostTitleCustom;
  return (
    <StPostContainer>
      <StPostArticleMain>
        {pageNumber === 1 && <PostContents postId={postId} />}
        {pageNumber === 2 && <TimeTable postId={postId}/>}
      </StPostArticleMain>
      {title.tags.length > 0 && (
        <Badge
          kind="tag"
          data={title.tags}
        />
      )}
      {title.mentions.length > 0 && (
        <Badge
          kind="mention"
          data={title.mentions}
        />
      )}

      <PostIcon
        postId={postId}
      />
    </StPostContainer>
  );
};

const StPostContainer = styled.div`
  margin-top: 32px;
  padding: 16px;
`;
const StPostArticleMain = styled.div`
width: 100%;
margin-bottom: 48px;
padding: 8px 0;
`;
