'use client';

import { listPostsAPI } from '@/apis/posts-apis';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRef } from 'react';
import styled from 'styled-components';

interface RowProps {
  title: string;
}

export default function Row({ title }: RowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  async function fetchMovies(per_page: number, offset_id: number) {
    const { data } = await listPostsAPI({ per_page, offset_id });
    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', 10, 0],
    queryFn: () => fetchMovies(10, 0),
  });

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <RowContainer>
      <RowTitle>{title}</RowTitle>
      <button onClick={() => handleScroll('left')}>◀</button>
      <RowContent ref={rowRef}>
        {data?.data.map((movie) => (
          <RowItem key={movie.message_id}>
            <Image
              src={movie.image_url}
              alt={movie.parsed_content.title}
              width={828}
              height={466}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </RowItem>
        ))}
      </RowContent>
      <button onClick={() => handleScroll('right')}>▶</button>
    </RowContainer>
  );
}

const RowContainer = styled.div`
  /* margin: 2rem; */
`;

const RowTitle = styled.h2`
  /* margin-bottom: 1rem; */
`;

const RowContent = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RowItem = styled.div`
  min-width: 841px;
  height: 480px;
  flex: 0 0 auto;
`;
