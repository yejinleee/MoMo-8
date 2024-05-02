import styled from '@emotion/styled';
import { useContext } from 'react';
import { postIdContext } from './components/DetailPostContext';
import { FormatDate } from './components/FormatDate';
import { theme } from '@/style/theme';
import { Profile } from '@common/Profile/Profile';
import { Spinner } from '@common/index';
import { IPostTitleCustom, IUser } from '@/api/_types/apiModels';
import { useGetPostDetail } from '@/hooks/query/usePost';

interface IResData {
  postTitle: string;
  createdAt: string;
  image: string;
  _id: string;
  username: string;
  fullName: string;
}

export interface IQueryData<T> {
  data: T;
}

export const PostHeader = () => {
  const postId = useContext(postIdContext);

  const {data} = useGetPostDetail(postId);
  if (!data) return <Spinner />;
  const { title, createdAt, author } = data.data;

  // Todo: 위 코드와 아래 주석 코드 중, 조금 더 효율이 좋은 방법 중 하나로 수정 예정
  // const { data: response, isFetched } = usePostDetail(id || '');
  // if (!isFetched) return null;
  // const parsedTitle = JSON.parse(response?.title) as IPostTitleCustom;
  // const responseAuthor = (response?.author as IUser) || {};

  const responseTitle = JSON.parse(title) as IPostTitleCustom;
  const responseAuthor = author as IUser;
  const resData: IResData = {
    postTitle: responseTitle.postTitle,
    createdAt: FormatDate(createdAt),
    image: responseAuthor?.image || '',
    _id: responseAuthor._id,
    username: responseAuthor?.username ? responseAuthor.username : '',
    fullName: responseAuthor.fullName,
  };

  return (
    <>
      <StMeetDescription>
        <StMeetInformation>
          <span>{resData.postTitle}</span>
          <span>{resData.createdAt}</span>
        </StMeetInformation>
        <Profile
          image={resData.image}
          _id={resData._id}
          fullName={resData.username || resData.fullName}
          fontSize={16}
          imageSize={32}
          status="Profile"
        />
      </StMeetDescription>
    </>
  );
};

const StMeetDescription = styled.div`
  height: 64px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StMeetInformation = styled.div`
  max-width: 70%;

  & > span {
    display: block;
    margin: 4px 0;
  }
  & span:first-of-type {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 700;
    font-size: 18px;
  }
  & span:last-child {
    font-size: 16px;
    color: ${theme.colors.grey.default};
  }
`;
