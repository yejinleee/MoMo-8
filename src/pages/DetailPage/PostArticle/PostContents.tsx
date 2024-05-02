import styled from '@emotion/styled';
import { IPostTitleCustom } from '@/api/_types/apiModels';
import { useGetPostDetail } from '@/hooks/query/usePost';

type PostContentsType = {
  postId: string;
};

export const PostContents = ({ postId }: PostContentsType) => {
  const {data} = useGetPostDetail(postId);
  const {image, title}=data.data
  const responseTitle = JSON.parse(title) as IPostTitleCustom;
  
  return (
    <>
        {image && (
          <StPostImgWrapper>
            <img
              src={image}
              alt={`${title}_image`}
            />
          </StPostImgWrapper>
        )}
        <StPostContents>{responseTitle.contents}</StPostContents>
    </>
  );
};

export const StPostContainer = styled.div`
  width: 100%;
  margin-bottom: 48px;
  padding: 8px 0;
`;

const StPostContents = styled.pre`
  font-size: 16px;
  margin: 16px 0;
  white-space: pre-wrap;
  word-break: break-all;
`;

const StPostImgWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;

  & > img {
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 16px;
  }
`;
