import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  COLOR_GRAY_200,
  COLOR_GRAY_300,
  COLOR_GREEN_100,
  COLOR_GREEN_300,
  COLOR_WHITE,
} from '../constants/colors';

export const FooterContainer = styled.footer`
  width: 100%;
  min-height: 24rem;
  padding: 4rem 6rem 6rem 10rem;
  display: flex;
  justify-content: space-between;
  background-color: ${COLOR_WHITE};
`;

export const LeftSide = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const RightSide = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-end;
`;

export const FooterLink = styled(Link)`
  font-size: 2.2rem;
  font-weight: 600;
  color: ${COLOR_GRAY_300};
  text-decoration: none;
  transition: 0.5s;

  :hover {
    color: ${COLOR_GRAY_200};
  }
`;

export const GithubLink = styled.a`
  width: 25px;
  height: 25px;
  transition: 0.5s;

  :hover {
    transform: scale(1.1);
  }
`;

export const GithubLogo = styled.img`
  width: 100%;
  height: 100%;
`;

export const PriceChecker = styled(Link)`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${COLOR_GREEN_100};
  text-decoration: none;
  transition: 0.5s;

  :hover {
    color: ${COLOR_GREEN_300};
  }
`;
