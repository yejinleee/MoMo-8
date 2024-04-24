import styled from '@emotion/styled';
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILike, IPost, IUser } from '@/api/_types/apiModels';
import { deleteApiJWT, postApiJWT } from '@/api/apis';
import { CreateMeetingModal } from '@/pages/MainPage/Modal/CreateMeetingModal';
import { Icon } from '@common/index';
import { useGetPostDetail } from '@/hooks/query/usePost';
// import { useQueryClient } from '@tanstack/react-query';
// import { IQueryData } from '../DetailMeetDescription';

interface PostIconProps {
  // apiResponse: IPost;
  loginUser: IUser | null;
  postId: string;
}

export const PostIcon = ({ loginUser, postId }: PostIconProps) => {
  const [isHeart, setIsHeart] = useState('');
  const [isPostOwner, setIsPostOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // TODO : 여긴 useQueryClient ? useQuery면?
  // const queryClient = useQueryClient();
  // const data = queryClient.getQueryData<IQueryData<IPost>>([`posts/${postId}`, postId]) // ERROR
  // // if (!data) return <Spinner/>
  // const {_id, author, likes} = data.data
  // useQuery면 됨..ㅇㅅㅇ?
  const {data} = useGetPostDetail(postId);
  const {_id, author, likes}=data.data

  const handleHeartClick = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!loginUser) {
      const isUserNeedLogin = confirm('로그인이 필요한 서비스입니다.');
      isUserNeedLogin && navigate('/login');
      return;
    }
    if (!isHeart) {
      await postApiJWT<ILike>('/likes/create', { postId: _id })
        .then((res) => {
          setIsHeart(res.data._id);
        })
        .catch((err) => console.log(err));
    } else if (isHeart) {
      await deleteApiJWT<ILike>('/likes/delete', {
        id: isHeart,
      })
        .then(() => {
          setIsHeart('');
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteClick = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const isPostDelete = confirm('정말 삭제하시겠습니까?');
    if (!isPostDelete) return;

    await deleteApiJWT<IPost>('/posts/delete', { id: _id });

    alert('삭제되었습니다.');
    navigate('/');
  };

  const handleEditClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  useEffect(() => {
    const LoginUserId = loginUser && loginUser._id;
    const PostLike = likes as ILike[];
    const result = PostLike?.find((like) => like.user === LoginUserId);

    setIsHeart(result ? result._id : '');
    setIsPostOwner(LoginUserId === (author as IUser)._id);
  }, [loginUser]);

  return (
    <>
      <StIconContainer>
        <StIconsWrapper>
          <Icon
            name="heart"
            size={24}
            isFill={!!isHeart}
            onIconClick={(e: MouseEvent<HTMLElement>) =>
              void handleHeartClick(e)
            }
          />
        </StIconsWrapper>
        {isPostOwner && (
          <StAdminIconsWrapper>
            <Icon
              name="edit"
              size={24}
              onIconClick={(e: MouseEvent<HTMLElement>) => handleEditClick(e)}
            />
            <Icon
              name="trash-2"
              size={24}
              onIconClick={(e: MouseEvent<HTMLElement>) =>
                void handleDeleteClick(e)
              }
            />
          </StAdminIconsWrapper>
        )}
      </StIconContainer>
      <CreateMeetingModal
        post={data.data}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </CreateMeetingModal>
    </>
  );
};
const StIconContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  padding: 4px 0;
`;

const StIconsWrapper = styled.div`
  flex-grow: 1;
`;

const StAdminIconsWrapper = styled.div`
  & > span:last-of-type {
    margin-left: 24px;
  }
`;
