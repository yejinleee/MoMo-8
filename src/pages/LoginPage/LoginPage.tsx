import styled from '@emotion/styled';
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '@/_redux/hooks';
import { getUserInfo } from '@/_redux/slices/userSlice';
import { IUser } from '@/api/_types/apiModels';
import { postApi } from '@/api/apis';
import logo from '@/assets/logo.png';
import { theme } from '@/style/theme';
import { getItem, setItem } from '@/utils/storage';
import { Button, InputCompound } from '@common/index';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const handleLogin = (
    e: FormEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    postApi<{
      user: IUser;
      token: string;
    }>('/login', { email, password })
      .then((res) => {
        setItem('JWT', res.data.token);
        void dispatch(getUserInfo());
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setLoginError('로그인 정보가 잘못 되었습니다.');
        emailRef.current?.focus();
      });
  };

  useEffect(() => {
    if (getItem('JWT')) {
      navigate('/');
    }
  }, [navigate]);
  const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void handleLogin(e);
    }
  };

  return (
    <>
      <StLoginContainer>
        <StDescriptionContainer>
          <StDescriptionLogo>
            <img src={logo} alt='모모' />
          </StDescriptionLogo>
          <StDescriptionText>
            <span style={{ fontSize: '32px' }}>모</span>두의{' '}
            <span style={{ fontSize: '32px' }}>모</span>임
          </StDescriptionText>
        </StDescriptionContainer>
        <StVerticalLine />
        <StLoginFormContainer>
          <StFormTitle>로그인</StFormTitle>
          <StInputText>
            <InputCompound style={{ width: '300px' }}>
              <InputCompound.Text
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={emailRef}
                onKeyUp={handleOnKeyUp}
              />
            </InputCompound>
            {loginError}
          </StInputText>
          <StInputText>
            <InputCompound style={{ width: '300px' }}>
              <InputCompound.Text
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordRef}
                onKeyUp={handleOnKeyUp}
              />
            </InputCompound>
          </StInputText>
          <div onClick={handleLogin}>
            <Button
              label={'확인'}
              type="submit"
            />
          </div>
          <StSignupLink onClick={() => navigate('/signUp')}>
            회원가입
          </StSignupLink>
        </StLoginFormContainer>
      </StLoginContainer>
    </>
  );
};

const StLoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StDescriptionContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StVerticalLine = styled.div`
  width: 1px;
  background-color: ${theme.colors.grey.light};
  height: 90%;
`;

const StLoginFormContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StFormTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StSignupLink = styled.div`
  color: ${theme.colors.grey.default};
  cursor: pointer;
  padding-top: 30px;
`;

const StInputText = styled.div`
  height: 85px;
  max-width: 300px;
  font-size: 14px;
  color: ${theme.colors.red};
`;

const StDescriptionLogo = styled.div``;

const StDescriptionText = styled.div`
  padding-top: 20px;
  font-weight: 500;
  font-size: 20px;
  font-family: 'seolleimcool-SemiBold';
`;
