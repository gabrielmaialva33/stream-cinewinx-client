'use client';

import { useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { listPostsAPI } from '@/apis/posts-apis';

async function fetchMovies(per_page: number, offset_id: number) {
  const { data } = await listPostsAPI({ per_page, offset_id });
  return data;
}

const RowContainer = styled.div`
  margin-top: 40px;
  position: relative;
`;

const RowTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-family: 'Montserrat', sans-serif;
  color: #64cc95;
`;

const RowContent = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 10px;
  padding: 10px 0;
  scroll-snap-type: x mandatory;

  & > div {
    scroll-snap-align: start;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RowItem = styled.div`
  flex: 0 0 auto;
  width: 533px;
  height: 300px;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  background: #000;
  transition: all 0.4s ease-in-out;

  &:hover {
    transform: scale(1.1);
    z-index: 2;
  }
`;

const ArrowButton = styled.button<{ direction: string }>`
  position: absolute;
  top: 50%;
  ${({ direction }) => (direction === 'left' ? 'left: 0' : 'right: 0')};
  transform: translateY(-50%);
  background-color: rgba(41, 19, 38, 0.6);
  color: #64cc95;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 100;

  &:hover {
    background-color: rgba(41, 19, 38, 0.9);
    transform: translateY(-50%) scale(1.1);
  }
`;

const MovieInfo = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  padding: 20px;
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
  max-height: 0;

  ${RowItem}:hover & {
    max-height: 150px;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .details,
  .synopsis {
    font-size: 0.9rem;
    color: #aaa;
  }

  .synopsis {
    font-size: 0.85rem;
    color: #ccc;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
`;

export default function Row({ title }: { title: string }) {
  const rowRef = useRef<HTMLDivElement>(null);

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

      <ArrowButton direction="left" onClick={() => handleScroll('left')}>
        <IoIosArrowBack size={20} />
      </ArrowButton>

      <RowContent ref={rowRef}>
        {data?.data.map((movie) => (
          <RowItem key={movie.message_id}>
            <Image
              src={movie.image_url}
              alt={movie.parsed_content.title}
              width={533}
              height={300}
              objectFit="cover"
            />

            <MovieInfo>
              <h3>{movie.parsed_content.title}</h3>
              <div className="details">
                {movie.parsed_content.release_date} •{' '}
                {movie.parsed_content.country_of_origin || 'N/A'}
              </div>
              <p className="synopsis">
                {movie.parsed_content.synopsis || 'Descrição não disponível.'}
              </p>
            </MovieInfo>
          </RowItem>
        ))}
      </RowContent>

      <ArrowButton direction="right" onClick={() => handleScroll('right')}>
        <IoIosArrowForward size={20} />
      </ArrowButton>
    </RowContainer>
  );
}
