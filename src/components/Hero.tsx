'use client';

import styled from 'styled-components';

const HeroContainer = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  background: url('/hero-image.jpg') no-repeat center center / cover;
  color: white;
`;

const HeroButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background: red;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: darkred;
  }
`;

export default function Hero() {
  return (
    <HeroContainer>
      <h1>Featured Movie Title</h1>
      <p>Exciting movie description goes here.</p>
      <HeroButton>Watch Now</HeroButton>
    </HeroContainer>
  );
}
