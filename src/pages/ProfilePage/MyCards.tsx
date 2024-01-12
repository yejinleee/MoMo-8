import styled from '@emotion/styled';
import { useSelector } from '@/_redux/hooks';
import { IPost } from '@/api/_types/apiModels';
import { getApi } from '@/api/apis';
import useAxios from '@/api/useAxios';
import { Card } from '@common/Card/Card';
import { Spinner } from '@common/Spinner/Spinner';

export const MyCards = () => {
  const userInfo = useSelector((state) => state.userInfo.user?._id);
  const { response, error, isLoading } = useAxios<IPost[]>(() =>
    getApi(`/posts/author/${userInfo}`),
  );
  console.log(response);
  return (
    <>
      <StCardsWrapper>
        {isLoading ? (
          <Spinner />
        ) : !error && response.length > 0 ? (
          response.map((post, idx) => (
            <Card
              key={idx}
              cardData={post}
              handleCardClick={() => ''}
            />
          ))
        ) : (
          <div>아직 만든 모임이 없어요</div>
        )}
      </StCardsWrapper>
    </>
  );
};

const StCardsWrapper = styled.div`
  margin-top: 23px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: center;
  gap: 64px;
  width: 100%;
  box-sizing: border-box;
`;
