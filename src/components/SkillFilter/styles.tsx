import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { customMedia, theme } from '../../themes/theme';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(196, 196, 196, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const ModalWrapper = styled.div`
  display: flex;
  width: 70vw;
  height: 60vh;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: ${theme.colors.background};
  color: ${theme.colors.orange};
  position: relative;
  z-index: 10;
  border-radius: 10px;

  padding: 23px 30px 23px 30px;

  ${customMedia.lessThan('mobileL')`
    width: 100vw;
    height: 100vh;
  `}
`;

export const ModalContent = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  h3 {
    font-size: 30px;
    font-weight: bold;
    margin: 15px 0 15px 0;
  }
`;

export const HeaderModalFilter = styled.div`
  width: 100%;

  margin: 0 0 40px 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleModalFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  h2 {
    font-size: 35px;
    font-weight: bold;
    margin-left: 16px;
  }

  ${customMedia.lessThan('mobileS')`
    h2 {
      font-size: 30px;
      font-weight: bold;
      margin-left: 16px;
    }
  `}
`;

export const CloseModalFilter = styled(MdClose)`
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  ${customMedia.lessThan('mobileL')`
    align-items: center;
  `}
`;

export const ButtonModalFilter = styled.button`
  width: 25%;
  height: 60px;

  margin: 0 0 40px 0;  
  border: 1px solid ${theme.colors.orange};
  border-radius: 12px;

  background-color: ${theme.colors.orange};
  color: ${theme.colors.white};

  font-size: 35px;
  line-height: 52px;
  font-weight: 400;

  ${customMedia.lessThan('laptop')`
    width: 40%;
  `}

  ${customMedia.lessThan('tablet')`
    width: 70%;
  `}
  
  ${customMedia.lessThan('mobileL')`
    margin: 0;
  `}
`;
