import { useNavigate } from 'react-router-dom';
import { StCardsWrapper } from './profilePageStyles';
import { useSelector } from '@/_redux/hooks';
import { IPost } from '@/api/_types/apiModels';
// import { getApi } from '@/api/apis';
// import useAxios from '@/api/useAxios';
import { Card, Spinner } from '@common/index';
import { usePostsAuthor } from '@/hooks/queryHooks';

export const MyCards = () => {
  const navigate = useNavigate();

  const userId = useSelector((state) => state.userInfo.user?._id);
  // const { response, error, isLoading } = useAxios<IPost[]>(() =>
  //   getApi(`/posts/author/${userInfo}`),
  // );
  const {data, isError, isFetching} = usePostsAuthor<IPost[]>(userId)
  const response = data.data
  return (
    <>
      <StCardsWrapper>
        {isFetching ? (
          <Spinner />
        ) : response && !isError && response.length > 0 ? (
          response.map((post, idx) => (
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
