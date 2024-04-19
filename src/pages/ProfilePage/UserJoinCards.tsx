import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPostData } from './getPostData';
import { StCardsWrapper } from './profilePageStyles';
import { IPost, IUser } from '@/api/_types/apiModels';
// import { getApi } from '@/api/apis';
// import useAxios from '@/api/useAxios';
import { Card, Spinner } from '@common/index';
import { useUsersInfo } from '@/hooks/queryHooks';

export const UserJoinCards = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();

  const [allJoinedPosts, setAllJoinedPosts] = useState<IPost[]>([]);

  // const { response, error, isLoading } = useAxios<IUser>(() =>
  //   getApi(`/users/${userId}`),
  // );
  const {data, isError, isFetching} = useUsersInfo<IUser>(userId)
  const response = data.data
  
  useEffect(() => {
    setAllJoinedPosts([] as IPost[]);
    if (!userId) return;
    if (!isError && !isFetching && response) {
      response.comments.map((res) => {
        if (typeof res !== 'string') {
          if (res.comment.includes('@VOTE') && res.comment.includes(userId)) {
            void getPostData(res.post).then((resPost) => {
              setAllJoinedPosts((prev) => [...prev, resPost]);
            });
          }
        }
      });
    }
  }, [response, isFetching]);

  return (
    <>
      <StCardsWrapper>
        {!allJoinedPosts ? (
          <Spinner />
        ) : allJoinedPosts.length > 0 ? (
          allJoinedPosts.map((post, idx) => (
            <Card
              key={idx}
              cardData={post}
              handleCardClick={(cardId) => navigate(`/details/${cardId}`)}
            />
          ))
        ) : (
          <div>아직 만든 모임이 없어요</div>
        )}
      </StCardsWrapper>
    </>
  );
};
