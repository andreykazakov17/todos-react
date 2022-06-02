import React, { memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import AppBar from '@mui/material/AppBar';

const StyledAppBar = styled(AppBar)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 25px;
  box-shadow: inner 10px 5px 5px red;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  min-width: 80px;
  font-size: 16px;
  text-decoration: none;
  color: black;
  &:hover {
    color: green;
  }
`;

interface HeaderProps {
  onClick: () => void;
  user: string;
  children: ReactNode;
}

const Header = memo(({ onClick, user, children }: HeaderProps) => (
  <StyledAppBar position="static" color="default">
    <StyledLink onClick={onClick} to="/signup">
      Log out
    </StyledLink>
    {children}
    <div>User: {user}</div>
  </StyledAppBar>
));

export default Header;
