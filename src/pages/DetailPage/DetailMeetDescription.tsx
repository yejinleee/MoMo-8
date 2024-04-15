import styled from '@emotion/styled';
import { FormatDate } from './FormatDate';
import { IPost, IPostTitleCustom, IUser } from '@/api/_types/apiModels';
import { theme } from '@/style/theme';
import { Profile } from '@common/Profile/Profile';
import { usePostDetail } from '@/hooks/queryHooks';

interface IResData {
  postTitle: string;
  createdAt: string;
  image: string;
  _id: string;
  username: string;
  fullName: string;
}

type DetailMeetDescriptionType = {
  postId: string;
};

export const DetailMeetDescription = ({
  postId
}: DetailMeetDescriptionType) => {
  const {data} = usePostDetail<IPost>(postId);
  const { title,  createdAt,  author}=data.data
  
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
