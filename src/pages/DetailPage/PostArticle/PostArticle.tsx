import styled from '@emotion/styled';
import { Badge } from './Badge';
import { DetailTimeTablePage } from './DetailTimeTablePage';
import { PostContents } from './PostContents';
import { PostIcon } from './PostIcon';
import { IPostTitleCustom, IUser } from '@/api/_types/apiModels';

interface DetailPostProps {
  postId: string;
  pageNumber: number;
  responseTitle: string;
  loginUser: IUser | null;
}

export const PostArticle = ({
  postId,
  pageNumber,
  responseTitle,
  loginUser,
}: DetailPostProps) => {
  const title = JSON.parse(responseTitle) as IPostTitleCustom;
  return (
    <StPostContainer>
      {pageNumber === 1 && <PostContents postId={postId} />}
      {pageNumber === 2 && <DetailTimeTablePage postId={postId} />}

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
        loginUser={loginUser}
        postId={postId}
      />
    </StPostContainer>
  );
};

const StPostContainer = styled.div`
  margin-top: 32px;
  padding: 16px;
`;
