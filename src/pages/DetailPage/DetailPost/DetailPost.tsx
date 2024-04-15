import styled from '@emotion/styled';
import { Badge } from './Badge';
import { DetailTimeTablePage } from './DetailTimeTablePage';
import { PostContents } from './PostContents';
import { PostIcon } from './PostIcon';
import { IPost, IPostTitleCustom, IUser } from '@/api/_types/apiModels';

interface DetailPostProps {
  postId: string;
  pageNumber: number;
  response: IPost;
  loginUser: IUser | null;
}

export const DetailPost = ({
  postId,
  pageNumber,
  response,
  loginUser,
}: DetailPostProps) => {
  const responseTitle = JSON.parse(response.title) as IPostTitleCustom;
  console.log("~")
  return (
    <StPostContainer>
      {pageNumber === 1 && <PostContents postId={postId} />}
      {pageNumber === 2 && <DetailTimeTablePage postId={postId}/>}

      {responseTitle.tags.length > 0 && (
        <Badge
          kind="tag"
          data={responseTitle.tags}
        />
      )}
      {responseTitle.mentions.length > 0 && (
        <Badge
          kind="mention"
          data={responseTitle.mentions}
        />
      )}

      <PostIcon
        loginUser={loginUser}
        apiResponse={response}
      />
    </StPostContainer>
  );
};

const StPostContainer = styled.div`
  margin-top: 32px;
  padding: 16px;
`;
