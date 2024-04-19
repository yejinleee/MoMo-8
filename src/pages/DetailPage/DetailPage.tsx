import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserInfo } from '../../_redux/slices/userSlice';
import { DetailComment } from './DetailComment/DetailComment';
import { DetailMeetDescription } from './DetailMeetDescription';
import { DetailPost } from './DetailPost/DetailPost';
import { DetailTab } from './DetailTab';
import { useDispatch, useSelector } from '@/_redux/hooks';
// import { getPostDetail } from '@/_redux/slices/postSlices/getPostSlice';
import { RootStateType } from '@/_redux/store';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { Spinner } from '@common/index';
import { IPost } from '@/api/_types/apiModels';
import { setDetailPostId } from '@/_redux/slices/detailPostIdSlice';
import { getPostDetail } from '@/_redux/slices/postSlices/getPostSlice';
import { useGetPostDetail } from '@/hooks/query/usePost';

export const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootStateType) => state.userInfo);

  // const {
  //   isLoading,
  //   post: response,
  //   error :isError,
  // } = useSelector((state: RootStateType) => state.getPostDetail);
  const {data, isLoading, isError} = useGetPostDetail<IPost>(id!);
  const response =data.data
  
  useEffect(() => {
    if (!id) return;
    dispatch(setDetailPostId(id))  
    const handleAPIError = () => {
      alert('API로부터 데이터를 받아올 때 에러가 발생했습니다.');
      navigate('/');
    };
    if (isError) {
      handleAPIError();
    }
    void dispatch(getUserInfo());//////?
    void dispatch(getPostDetail(id));
  }, [isError, navigate, dispatch, id]);

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
          <DetailMeetDescription postId={id!} />
          <DetailTab
            pageNumber={pageNumber}
            handlePostClick={() => setPageNumber(1)}
            handleTimeTableClick={() => setPageNumber(2)}
          />
          <DetailPost
            postId= {id!}
            pageNumber={pageNumber}
            responseTitle={response.title}
            loginUser={isLogin.user ?? null}
          />
          <hr />
          <DetailComment
            postId= {id!}
            response={response}
            loginUser={isLogin.user ?? null}
          />
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
