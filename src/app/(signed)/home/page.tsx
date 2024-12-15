'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Row from '@/components/Row';
import styled from 'styled-components';

const HomeContainer = styled.div`
  background-color: #000;
  color: #fff;
  min-height: 100vh;
`;

export default function Home() {
  return (
    <HomeContainer>
      <Header />
      <Hero />
      <main>
        <Row title="Trending Now" />
        {/* <Row title="Top Rated" fetchUrl="/api/top-rated" />
        <Row title="Action Movies" fetchUrl="/api/action-movies" />
        <Row title="Comedies" fetchUrl="/api/comedies" /> */}
      </main>
    </HomeContainer>
  );
}
