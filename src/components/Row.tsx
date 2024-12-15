'use client';

import { listPostsAPI } from '@/apis/posts-apis';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRef } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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
      const scrollAmount = direction === 'left' ? -1000 : 1000;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <RowContainer>
      <RowTitle>{title}</RowTitle>
      <ArrowButton
        className="arrow-button"
        onClick={() => handleScroll('left')}
        direction="left"
      >
        <IoIosArrowBack size={30} />
      </ArrowButton>
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
      <ArrowButton
        className="arrow-button"
        onClick={() => handleScroll('right')}
        direction="right"
      >
        <IoIosArrowForward size={30} />
      </ArrowButton>
    </RowContainer>
  );
}

const RowContainer = styled.div`
  position: relative;
  margin: 2rem 0;
  cursor: pointer;

  &:hover .arrow-button {
    opacity: 1;
  }
`;

const RowTitle = styled.h2`
  margin-bottom: 1rem;
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
  min-width: 420px;
  height: 240px;
  flex: 0 0 auto;
`;

const ArrowButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  bottom: 16px;
  ${({ direction }) => direction}: 0;
  height: 240px;
  width: 50px;
  opacity: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;

  svg {
    transition: transform 0.4s ease-in-out;
  }

  &:hover {
    transform: scale(1.1);
  }

  &:hover svg {
    transform: scale(1.3);
  }

  &.arrow-button {
    opacity: 0;
  }
`;
