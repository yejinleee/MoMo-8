import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPostData } from './getPostData';
import { StCardsWrapper } from './profilePageStyles';
import { useSelector } from '@/_redux/hooks';
import { IPost, IUser } from '@/api/_types/apiModels';
// import { getApi } from '@/api/apis';
// import useAxios from '@/api/useAxios';
import { Card, Spinner } from '@common/index';
import { useUsersInfo } from '@/hooks/queryHooks';

export const MyJoinCards = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.user);
  const [allJoinedPosts, setAllJoinedPosts] = useState<IPost[]>([]);

  // const { response, error, isLoading } = useAxios<IUser>(() =>
  //   getApi(`/users/${userInfo?._id}`),
  // );
  const {data, isError, isFetching, isFetched} = useUsersInfo<IUser>(userInfo?._id)
  const response = data.data
  
  useEffect(() => {
    console.log("RR",response)
    setAllJoinedPosts([] as IPost[]);
    if (!userInfo) return;
    if (!isError && !isFetching && response) {
      response.comments.map((res) => {
        if (typeof res !== 'string') {
          if (
            res.comment.includes('@VOTE') &&
            res.comment.includes(userInfo._id)
          ) {
            void getPostData(res.post).then((resPost) => {
              setAllJoinedPosts((prev) => [...prev, resPost]);
              console.log("!",resPost)
            });
          }
        }
      });
    }
  }, [userInfo]);
  console.log(isFetched, allJoinedPosts)
  return (
    <>
      <StCardsWrapper>
        {isFetched && !allJoinedPosts ? (
          <Spinner />
        ) : allJoinedPosts.length > 0 ? (
          allJoinedPosts.map((likedPost, idx) => (
            <Card
              key={idx}
              cardData={likedPost}
              handleCardClick={(cardId) => navigate(`/details/${cardId}`)}
            />
          ))
        ) : (
          <div>모임에 참여해보세요!</div>
        )}
      </StCardsWrapper>
    </>
  );
};
