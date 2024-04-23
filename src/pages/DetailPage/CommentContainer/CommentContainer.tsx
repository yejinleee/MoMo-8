import styled from '@emotion/styled';
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';
import { IPost, IUser } from '@/api/_types/apiModels';

interface CommentContainerProps {
  response: IPost;
  loginUser: IUser | null;
  postId: string;
}

export const CommentContainer = ({
  response,
  loginUser,
  postId,
}: CommentContainerProps) => {
  return (
    <StCommentContainer>
      <StCommentPicket>댓글</StCommentPicket>
      <CommentInput
        loginUser={loginUser}
        postId={postId}
        postAuthorId={
          typeof response.author === 'string'
            ? response.author
            : response.author._id
        }
      />
      <CommentList
        loginUser={loginUser}
        comments={response.comments}
        postId={postId}
      />
    </StCommentContainer>
  );
};

const StCommentContainer = styled.div`
  margin-top: 8px;
  padding: 16px;
`;

const StCommentPicket = styled.div`
  font-size: 18px;
  font-weight: 600;
`;
