'use client';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.8);
`;

const Nav = styled.nav`
  ul {
    display: flex;
    gap: 1.5rem;
    list-style: none;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <h1>Cinewinx</h1>
      <Nav>
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
        </ul>
      </Nav>
    </HeaderContainer>
  );
}
