import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import styled from 'styled-components';
import { RootState } from '../../store/store';
import { AuthForm } from '../common/AuthForm';
import { handleAuthSubmit } from '../common/AuthForm/authResponse';

const AuthPageContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

export const SignupPage = () => {
  const logged = useSelector((state: RootState) => state.login.logged);
  return (
    <AuthPageContainer>
      {logged && <Navigate to='/profile' />}
      <AuthForm type='signup' onAuthSubmit={handleAuthSubmit} />
    </AuthPageContainer>
  );
};
