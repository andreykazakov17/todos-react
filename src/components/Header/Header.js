import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 16px;
  min-width: 80px;
  text-decoration: none;
  color: black;
  &:hover {
    color: green;
  }
`;

const Header = ({ onClick, user }) => (
  <AppBar
    position="static"
    color="default"
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '10px 25px',
      boxShadow: 'inner 10px 5px 5px red',
    }}
  >
    <StyledLink onClick={onClick} to="/signup">
      Log out
    </StyledLink>
    <div>User: {user}</div>
  </AppBar>
);

export default Header;
