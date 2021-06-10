import styled from '@emotion/styled/macro';
import { Dialog as ReachUIDialog } from '@reach/dialog';
import * as mq from '../../styles/media-queries';
import * as colors from '../../styles/colors';

export const Dialog = styled(ReachUIDialog)`
  max-width: 400px;
  border-radius: 5px;
  margin: 20vh auto;
  ${mq.small} {
    width: 90%;
    margin: 10vh auto;
    padding: 1rem;
  }
`;

export const Close = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  border-radius: 100%;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1;
  border: 1px solid ${colors.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    height: 1rem;
  }
`;

export const Title = styled.h3`
  text-align: center;
  font-size: 2rem;
  margin: 0 1rem 1rem;
`;
