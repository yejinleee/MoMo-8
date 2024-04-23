import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailComment } from './DetailComment/DetailComment';
import { DetailPost } from './PostContainer/DetailPost';
import PostIdContext from './components/PostIdContext';
import { useSelector } from '@/_redux/hooks';
import { RootStateType } from '@/_redux/store';
import { IPostTitleCustom } from '@/api/_types/apiModels';
import { usePostDetail } from '@/hooks/query/usePostDetail';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { Spinner } from '@common/index';

export const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootStateType) => state.userInfo);
  const { isLoading, isError } = usePostDetail(id || '');

  // Todo: PostTitle을 파싱한 값이 여러 하위 컴포넌트에서 사용됨
  // Todo: => data.data.title 값을 파싱해서 컨텍스트에 담아 감싸기

  const handleAPIError = () => {
    alert('API로부터 데이터를 받아올 때 에러가 발생했습니다.');
    navigate('/');
  };

  if (isError) {
    handleAPIError();
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
    response && (
      <StSideMarginWrapper>
        <StDetailContainer>
          <PostIdContext.Provider value={id || ''}>
            {/* Post part */}
            <PostContainer />
          </PostIdContext.Provider>
          <hr />
          {/* Comment part */}
          <DetailComment
            response={response.data}
            loginUser={isLogin.user ?? null}
          />
        </StDetailContainer>
      </StSideMarginWrapper>
    )
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
