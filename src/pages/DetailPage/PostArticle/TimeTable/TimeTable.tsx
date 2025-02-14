import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { VoteCellContainer } from './VoteTable/VoteCellContainer';
import {
  IScrollMethods,
  VoteScrollWrapper,
} from './VoteTable/VoteScrollWrapper';
import { useDispatch, useSelector } from '@/_redux/hooks';
import { getPostDetail } from '@/_redux/slices/postSlices/getPostSlice';
import {
  ICellsType,
  cancelVote,
  reset,
  updateInit,
} from '@/_redux/slices/timeTableSlice';
import { IComment, IUser } from '@/api/_types/apiModels';
import { deleteApiJWT, postApiJWT } from '@/api/apis';
import { createIVote } from '@/utils/createIVote';
import { parseTitle } from '@/utils/parseTitle';
import { transpose } from '@/utils/transpose';
import { Button } from '@common/index';
import { isEqual } from 'lodash';
import { useGetPostDetail } from '@/hooks/query/usePost';

export interface IVotedUser {
  id: string;
  fullName: string;
}

export interface ITimeVote {
  [key: string]: IVotedUser[];
}

export interface IVote {
  [key: string]: ITimeVote;
}

export type TimeTableType = {
  postId: string;
};

export const TimeTable = ({ postId }: TimeTableType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);

  const {
    _id: userId,
    fullName,
    username,
  } = useSelector((state) => state.userInfo.user as IUser);
  
  const {data} = useGetPostDetail(postId);
  const { title, comments}=data.data

  const [isVoting, setIsVoting] = useState(false);

  const myTableScroll = useRef<IScrollMethods>(null);
  const votedTableScroll = useRef<IScrollMethods>(null);

  const { vote, transposedVote, meetDate, participants, timeColumn, dateRow } =
    useMemo(() => {
      const parsedTitle = parseTitle(title);
      const meetDate = parsedTitle.meetDate;

      const receivedComments = comments as IComment[];
      const allVotes = receivedComments.filter(({ comment }) =>
        comment.startsWith('@VOTE'),
      );
      const participants = allVotes.map(({ author }) => ({
        id: author._id,
        fullName: author.fullName,
      }));
      const currentVote = [...allVotes];
      currentVote.sort(
        ({ createdAt: prev }, { createdAt: cur }) =>
          new Date(cur).getTime() - new Date(prev).getTime(),
      );

      let vote: IVote;

      if (currentVote.length > 0) {
        const splitedMyVote = currentVote[0].comment.split('@VOTE ')[1];
        const parsedMyVote = JSON.parse(splitedMyVote) as IVote;
        const tempVote = createIVote(meetDate);

        for (const src of meetDate) {
          const date = src.split('T')[0];
          if (parsedMyVote[date]) tempVote[date] = parsedMyVote[date];
        }
        vote = tempVote;
      } else {
        vote = createIVote(meetDate);
      }

      const voteEntries = Object.entries(vote);
      const dateRow = transpose(voteEntries)[0] as string[];
      const transposedVote = transpose(
        transpose(voteEntries)[1].map((time) =>
          Object.values(time as ITimeVote),
        ),
      );
      const timeColumn = transpose(voteEntries)[1].map((time) =>
        Object.keys(time),
      )[0];

      return {
        vote,
        meetDate,
        voteEntries,
        participants,
        times: Object.keys(voteEntries[0][1]),
        transposedVote,
        timeColumn,
        dateRow,
      };
    }, [user]);

  const { votedCells, prevVotedCells } = useSelector((state) => state.cells);

  const modifyMyVote = useCallback(
    (id: string, fullName: string, username: string | undefined) => {
      const currentCells = prevVotedCells as ICellsType[][];
      const modifiedVote = createIVote(meetDate);
      const dates = Object.keys(modifiedVote);

      for (const [i, date] of dates.entries()) {
        for (const [j, time] of timeColumn.entries()) {
          let modified = [...currentCells[j][i].votedUser];

          if (
            currentCells[j][i].classList.includes('voted-mine') &&
            currentCells[j][i].votedUser.every(({ id }) => id !== userId)
          ) {
            modified.push({ id, fullName, username });
          } else if (
            !currentCells[j][i].classList.includes('voted-mine') &&
            currentCells[j][i].votedUser.some(({ id }) => id === userId)
          ) {
            modified = modified.filter(({ id }) => id !== userId);
          }
          modifiedVote[date][time] = modified;
        }
      }

      return modifiedVote;
    },
    [vote, prevVotedCells],
  );

  const modifyVoteComment = async () => {
    const deleteCommentId =
      (comments as IComment[]).find(
        (comment) =>
          comment.author._id === userId && comment.comment.startsWith('@VOTE'),
      )?._id ?? (comments as string[]).find((id) => id === userId);

    const modifiedMyVote = modifyMyVote(userId, fullName, username);

    const stringifiedVote = JSON.stringify(modifiedMyVote);

    const modifiedVoteComment = `@VOTE ${stringifiedVote}`;

    try {
      if (deleteCommentId)
        await deleteApiJWT<IComment>('/comments/delete', {
          id: deleteCommentId,
        });

      await postApiJWT<IComment>('/comments/create', {
        comment: modifiedVoteComment,
        postId,
      });

      void dispatch(getPostDetail(postId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmClick = () => {
    if (isVoting && !isEqual(votedCells, prevVotedCells)) {
      void modifyVoteComment();
    }
    setIsVoting((old) => !old);
  };

  const handleCancelClick = () => {
    setIsVoting(false);
    void dispatch(cancelVote());
  };

  const handleMyTableScrollTop = (scrollTop: number) => {
    if (votedTableScroll.current) {
      votedTableScroll.current.setScrollTop(scrollTop);
    }
  };

  const handleMyTableScrollLeft = (scrollLeft: number) => {
    if (votedTableScroll.current) {
      votedTableScroll.current.setScrollLeft(scrollLeft);
    }
  };

  const handleVotedTableScrollTop = (scrollTop: number) => {
    if (myTableScroll.current) myTableScroll.current.setScrollTop(scrollTop);
  };

  const handleVotedTableScrollLeft = (scrollLeft: number) => {
    if (myTableScroll.current) myTableScroll.current.setScrollLeft(scrollLeft);
  };

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    }

    const myVote = transposedVote.map((row) =>
      row.map((users) => {
        const didVoted = users.some(({ id }) => id === user?._id);

        return didVoted ? ['selected'] : [];
      }),
    );

    const totalVote = transposedVote.map((row) =>
      row.map((users) => {
        const didVoted = users.some(({ id }) => id === user?._id);
        users;
        return {
          votedUser: users,
          classList: didVoted ? ['voted-mine'] : [],
        };
      }),
    );

    void dispatch(updateInit([myVote, totalVote]));

    return () => void dispatch(reset());
  }, [user]);

  return (
    <StContainer>
      <StTableContainer>
        <VoteScrollWrapper
          ref={myTableScroll}
          className={`myScrollWrapper ${isVoting ? 'isVoting' : ''}`}
          onScrollTop={handleMyTableScrollTop}
          onScrollLeft={handleMyTableScrollLeft}>
          <VoteCellContainer
            dateRow={dateRow}
            transposedVote={transposedVote}
            timeColumn={timeColumn}
            participants={participants}
            isMyTable={true}
          />
        </VoteScrollWrapper>
        <VoteScrollWrapper
          ref={votedTableScroll}
          className={`voteScrollWrapper ${isVoting ? 'isVoting' : ''}`}
          onScrollTop={handleVotedTableScrollTop}
          onScrollLeft={handleVotedTableScrollLeft}>
          <VoteCellContainer
            dateRow={dateRow}
            transposedVote={transposedVote}
            timeColumn={timeColumn}
            participants={participants}
            isMyTable={false}
          />
        </VoteScrollWrapper>
      </StTableContainer>
      <StButtonContainer>
        {isVoting && (
          <Button
            label="취소"
            width={50}
            height={30}
            color="NAVY"
            handleButtonClick={handleCancelClick}
          />
        )}
        <Button
          label={isVoting ? '완료하기' : '투표하기'}
          width={100}
          height={30}
          handleButtonClick={handleConfirmClick}
        />
      </StButtonContainer>
    </StContainer>
  );
};

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const StTableContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const StButtonContainer = styled.div`
  display: flex;
  gap: 6px;
`;
