import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Menu } from './Menu/Menu';
import './header.css';
import { useSelector } from '@/_redux/hooks';
import logo from '@/assets/logo.png';
import { Button } from '@common/index';

export const Header = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.userInfo.user);

  return (
    <StHeaderWrapper>
      <StContainer>
        <StLogo onClick={() => navigate('/')}>
          <img
            style={{ height: '30px' }}
            src={logo}
            alt='모모'
          />
          <div
            style={{
              fontFamily: 'seolleimcool-SemiBold',
              minWidth: '100px',
              marginLeft: '10px',
            }}>
            모두의 모임
          </div>
        </StLogo>
        {isLogin ? (
          <Menu />
        ) : (
          <Button
            color="BLUE"
            isOutline={true}
            width={70}
            height={30}
            label="로그인"
            handleButtonClick={() => navigate('/login')}
          />
        )}
      </StContainer>
    </StHeaderWrapper>
  );
};

const StHeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.sizes.headerHeight};
  background-color: ${({ theme }) => theme.colors.background.default};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.light};
  z-index: 99;
  display: flex;
  justify-content: center;
`;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1024px;
  padding: 0px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StLogo = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
