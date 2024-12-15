'use client';

import {useRef} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {useQuery} from '@tanstack/react-query';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';

import {listPostsAPI} from "@/apis/posts-apis";

async function fetchMovies(per_page: number, offset_id: number) {
    const {data} = await listPostsAPI({per_page, offset_id});
    return data;
}


// Main container of the row
const RowContainer = styled.div`
    margin-top: 40px;
    position: relative;
`;

// Row title
const RowTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-family: 'Montserrat', sans-serif;
    color: #64cc95; // Light green for emphasis
`;

// Content of the carousel
const RowContent = styled.div`
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    gap: 10px;
    padding: 10px 0;

    &::-webkit-scrollbar {
        display: none;
    }
`;

// Items inside the carousel
const RowItem = styled.div`
    flex: 0 0 auto;
    width: 600px;
    height: 300px;
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    // Subtle hover effect border

    &:hover {
        border: 3px solid #da2ec4; // Pink as the border color
    }
`;

// Navigation buttons
const ArrowButton = styled.button<{ direction: string }>`
    position: absolute;
    top: 50%;
    ${({direction}) => (direction === 'left' ? 'left: 0' : 'right: 0')};
    transform: translateY(-50%);
    background-color: rgba(41, 19, 38, 0.6); // Translucent background
    color: #64cc95; // Light green
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;
    z-index: 1;

    &:hover {
        background-color: rgba(41, 19, 38, 0.9);
        transform: translateY(-50%) scale(1.1);
    }
`;

export default function Row({title}: { title: string }) {
    const rowRef = useRef<HTMLDivElement>(null);

    const {data, isLoading, error} = useQuery({
        queryKey: ['movies', 10, 0], // limit 10, offset 0
        queryFn: () => fetchMovies(10, 0),
    });

    const handleScroll = (direction: 'left' | 'right') => {
        if (rowRef.current) {
            const scrollDistance = direction === 'left' ? -400 : 400;
            rowRef.current.scrollBy({left: scrollDistance, behavior: 'smooth'});
        }
    };


    if (isLoading) return <p>Loading...</p>;


    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <RowContainer>
            <RowTitle>{title}</RowTitle>

            {/* Button to scroll left */}
            <ArrowButton direction="left" onClick={() => handleScroll('left')}>
                <IoIosArrowBack size={20}/>
            </ArrowButton>

            {/* Carousel content */}
            <RowContent ref={rowRef}>
                {data?.data.map((movie) => (
                    <RowItem key={movie.message_id}>
                        <Image
                            src={movie.image_url}
                            alt={movie.parsed_content.title}
                            layout="fill"
                            objectFit="cover"
                        />
                    </RowItem>
                ))}
            </RowContent>

            {/* Button to scroll right */}
            <ArrowButton direction="right" onClick={() => handleScroll('right')}>
                <IoIosArrowForward size={20}/>
            </ArrowButton>
        </RowContainer>
    );
}