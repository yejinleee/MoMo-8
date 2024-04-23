import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentContainer } from './CommentContainer/CommentContainer';
import { PostContainer } from './PostContainer';
import PostIdContext from './components/PostIdContext';
import { useGetPostDetail } from '@/hooks/query/usePost';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { Spinner } from '@common/index';

export const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError } = useGetPostDetail(id || '');

  // Todo: PostTitle을 파싱한 값이 여러 하위 컴포넌트에서 사용됨
  // Todo: => data.data.title 값을 파싱해서 컨텍스트에 담아 감싸기

  if (isError) {
    alert('API로부터 데이터를 받아올 때 에러가 발생했습니다.');
    navigate('/');
  }

  // Todo: Suspense 작업 시 수정 예정
  if (isLoading)
    return (
      <>
        <StSpinnerWrapper>
          <Spinner size={36} />
        </StSpinnerWrapper>
      </>
    );

  return (
    <StSideMarginWrapper>
      <StDetailContainer>
        <PostIdContext.Provider value={id || ''}>
          {/* Post part */}
          <PostContainer />
        </PostIdContext.Provider>
        <hr />
        {/* Comment part */}
        <CommentContainer response={response.data} />
      </StDetailContainer>
    </StSideMarginWrapper>
  );
};

const StDetailContainer = styled.div`
  padding: 32px;
`;

const StSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;
