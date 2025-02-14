import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateMeetingModal } from '../Modal/CreateMeetingModal';
import { useSelector } from '@/_redux/hooks';
import { Card, Icon } from '@common/index.ts';
import { useGetUnscheduledCards } from '@/hooks/query/useCards.ts';

export const UnscheduledCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {data, isError} = useGetUnscheduledCards();
  const response = data.data;

  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.user);
  const handleModalOpen = () => {
    if (!userInfo) {
      const isMoveLogin = confirm('로그인이 필요한 서비스입니다.');
      return isMoveLogin && navigate('/login');
    }
    setIsModalOpen(true);
  };

  return (
    <>
        <StCardsWrapper>
          {!isError &&
            response &&
            response.map((post) => {
              return (
                <Card
                  key={post._id}
                  cardData={post}
                />
              );
            })}
          <StAddWrapper onClick={handleModalOpen}>
            <Icon
              name="plus"
              size={20}
            />
          </StAddWrapper>
        </StCardsWrapper>
      <CreateMeetingModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </CreateMeetingModal>
    </>
  );
};

const StCardsWrapper = styled.div`
  margin-top: 23px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  justify-items: center;
  align-items: center;
`;
const StAddWrapper = styled.button`
  box-shadow: 0 0 4px 0px ${({ theme }) => theme.colors.grey.default};
  border-radius: 8px;
  width: 36px;
  height: 36px;
  margin: 0 auto;
  padding: 20px;
  margin-bottom: 20px;
  background: inherit;
  transition: all 200ms ease-in-out;

  &:hover {
    transform: translateY(-6%);
  }
`;
