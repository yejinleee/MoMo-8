import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentContainer } from './CommentContainer/CommentContainer';
import { PostContainer } from './PostContainer';
import { postIdContext } from './components/DetailPostContext';
import { useGetPostDetail } from '@/hooks/query/usePost';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';

export const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isError } = useGetPostDetail(id || '');
  const response = data.data;

  if (isError) {
    alert('API로부터 데이터를 받아올 때 에러가 발생했습니다.');
    navigate('/');
  }

  return (
    <StSideMarginWrapper>
      <StDetailContainer>
        <postIdContext.Provider value={id || ''}>
          {/* Post part */}
          <PostContainer />

          <hr />
          {/* Comment part */}
          <CommentContainer response={response} />
        </postIdContext.Provider>
      </StDetailContainer>
    </StSideMarginWrapper>
  );
};

const StDetailContainer = styled.div`
  padding: 32px;
`;
