import styled from '@emotion/styled';
import { useEffect } from 'react';
import { MainArea } from './CardsArea/MainArea';
import { OnlineUsers } from './SideBar/OnlineUsers';
import { SearchBox } from './SideBar/SearchBox';
import { useDispatch } from '@/_redux/hooks';
import { getUserInfo } from '@/_redux/slices/userSlice';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';
import { useQuery } from '@tanstack/react-query';
import { getApiJWT } from '@/api/apis';
import { IUser } from '@/api/_types/apiModels';

export const MainPage = () => {
  console.log("ㅡ먀ㅜ메인")
  const fn = async() =>{
    console.log("????")
    return await getApiJWT<IUser>('/auth-user')
  }
  const {data : userInfoData, isFetching} = useQuery({
    queryKey : ['userInfo'],
    queryFn: fn
  })
  console.log(userInfoData,isFetching)

  return (
    <StSideMarginWrapper>
      <StMainWrapper>
        <StMainSide>
          <OnlineUsers></OnlineUsers>
          <SearchBox></SearchBox>
        </StMainSide>
        <StMainArea>
          <MainArea />
        </StMainArea>
      </StMainWrapper>
    </StSideMarginWrapper>
  );
};

const StMainWrapper = styled.div`
  display: flex;
  padding: 20px 0px;
  box-sizing: border-box;
`;
const StMainSide = styled.div`
  width: 300px;
  height: calc(100vh - 100px);
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
const StMainArea = styled.div`
  margin-left: 50px;
  flex-grow: 1;
`;
