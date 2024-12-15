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
    scroll-snap-type: x mandatory;

    & > div {
        scroll-snap-align: start;
    }

    &::-webkit-scrollbar {
        display: none;
    }
`;


// const TitleOverlay = styled.div`
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//     padding: 10px;
//     background: rgba(0, 0, 0, 0.7);
//     color: #fff;
//     text-align: center;
//     font-size: 1rem;
//     opacity: 0;
//     transition: opacity 0.3s ease-in-out;
// `;

// Items inside the carousel
const RowItem = styled.div`
    flex: 0 0 auto;
    width: 300px;
    height: 300px;
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    background: #000;
    transition: transform 0.3s, height 0.4s ease-in-out; // Transições para escala e altura


    &:hover {
        transform: scale(1.05);
        height: 500px;
        z-index: 2;
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

// Movie information overlay
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
        max-height: 200px;
    }

    h3 {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .details {
        font-size: 0.9rem;
        color: #aaa;
        margin-bottom: 10px;
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

const MovieImage = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease-in-out;

        ${RowItem}:hover & {
            transform: scale(1.1);
        }
    }
`;

export default function Row({title}: { title: string }) {
    const rowRef = useRef<HTMLDivElement>(null);

    const {data, isLoading, error} = useQuery({
        queryKey: ['movies', 10, 0], // limit 10, offset 0
        queryFn: () => fetchMovies(10, 0),
    });

    const handleScroll = () => {
        const items = rowRef.current?.children;
        if (!items) return;

        Array.from(items).forEach((child: Element) => {
            const item = child as HTMLElement;
            const rect = item.getBoundingClientRect();
            const isVisible =
                rect.left >= 0 &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth);

            if (isVisible) {
                item.style.opacity = '1';
                item.style.transform = 'scale(1.1)';
            } else {
                item.style.opacity = '0.6';
                item.style.transform = 'scale(1)';
            }
        });
    };

    if (isLoading) return <p>Loading...</p>;

    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <RowContainer>
            <RowTitle>{title}</RowTitle>

            {/* Botão para scroll à esquerda */}
            <ArrowButton direction="left" onClick={() => handleScroll()}>
                <IoIosArrowBack size={20}/>
            </ArrowButton>

            {/* Conteúdo do carrossel */}
            <RowContent>
                {data?.data.map((movie) => (
                    <RowItem key={movie.message_id}>
                        {/* Imagem do filme */}
                        <MovieImage>
                            <Image
                                src={movie.image_url}
                                alt={movie.parsed_content.title}
                                layout="fill"
                                objectFit="cover"
                            />
                        </MovieImage>

                        {/* Informações do filme */}
                        <MovieInfo>
                            <h3>{movie.parsed_content.title}</h3>
                            <div className="details">
                                {movie.parsed_content.release_date} • {movie.parsed_content.country_of_origin || "N/A"}
                            </div>
                            <p className="synopsis">
                                {movie.parsed_content.synopsis || "Descrição não disponível."}
                            </p>
                        </MovieInfo>
                    </RowItem>
                ))}
            </RowContent>

            {/* Botão para scroll à direita */}
            <ArrowButton direction="right" onClick={() => handleScroll()}>
                <IoIosArrowForward size={20}/>
            </ArrowButton>
        </RowContainer>
    );
}