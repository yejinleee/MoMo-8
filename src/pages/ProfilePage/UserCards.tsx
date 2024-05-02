import { StCardsWrapper } from './profilePageStyles';
import { IPost } from '@/api/_types/apiModels';
import { Card, Spinner } from '@common/index';
import { usePostsAuthor } from '@/hooks/queryHooks';

export const UserCards = ({ userId }: { userId: string }) => {
  const {data, isError, isFetching} = usePostsAuthor<IPost[]>(userId)
  const response = data.data
  return (
    <>
      <StCardsWrapper>
        {isFetching ? (
          <Spinner />
        ) : !isError && response.length > 0 ? (
          response.map((post) => (
            <Card
              key={post._id}
              cardData={post}
            />
          ))
        ) : (
          <div>아직 만든 모임이 없어요</div>
        )}
      </StCardsWrapper>
    </>
  );
};
