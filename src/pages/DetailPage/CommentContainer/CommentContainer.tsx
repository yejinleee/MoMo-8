import styled from '@emotion/styled';
import { useContext } from 'react';
import { postIdContext } from '../components/DetailPostContext';
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';
import { IPost } from '@/api/_types/apiModels';

interface CommentContainerProps {
  response: IPost;
}

export const CommentContainer = ({ response }: CommentContainerProps) => {
  const postId = useContext(postIdContext);

  return (
    <StCommentContainer>
      <StCommentPicket>댓글</StCommentPicket>
      <CommentInput
        postId={postId}
        postAuthorId={
          typeof response.author === 'string'
            ? response.author
            : response.author._id
        }
      />
      <CommentList
        comments={response.comments}
        postId={postId}
      />
    </StCommentContainer>
  );
};

const StCommentContainer = styled.section`
  margin-top: 8px;
  padding: 16px;
`;

const StCommentPicket = styled.div`
  font-size: 18px;
  font-weight: 600;
`;
