import styled from '@emotion/styled';
import { MainArea } from './CardsArea/MainArea';
import { OnlineUsers } from './SideBar/OnlineUsers';
import { SearchBox } from './SideBar/SearchBox';
import { useEffect } from 'react';
import { getUserInfo } from '@/_redux/slices/userSlice';
import { useDispatch } from '@/_redux/hooks';

export const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    void dispatch(getUserInfo());
  }, []);  

  return (
    <StMainPageWrapper>
      <StMainSide>
        <OnlineUsers></OnlineUsers>
        <SearchBox></SearchBox>
      </StMainSide>
      <MainArea />
    </StMainPageWrapper>
  );
};

const StMainPageWrapper = styled.div`
  display: flex;
  padding: 20px 0px;
  box-sizing: border-box;
`;
const StMainSide = styled.aside`
  width: 300px;
  // height: calc(100vh - 100px);
  max-height: 800px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.medium} {
    display: none;
  }
`;

