'use client';

import styled from 'styled-components';

// Main container styles for the Hero section
const HeroContainer = styled.div`
    position: relative;
    color: white;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 40px;

    // Background with soft color overlay
    background: linear-gradient(
            rgba(41, 19, 38, 0.7),
            rgba(41, 19, 38, 0.7)
    ),
    url('https://raw.githubusercontent.com/gabrielmaialva33/cinewinx-api/refs/heads/main/.github/assets/logo.jpg') no-repeat center center / cover;
`;

// Title with cohesive color emphasis
const Title = styled.h1`
    font-size: 3.5rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #64cc95; // Light green for main emphasis
`;

// Description with a secondary tone
const Description = styled.p`
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 600px;
    line-height: 1.5;
    color: #ced1d9; // Softer text tone
`;

// Action button
const HeroButton = styled.button`
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    color: #ffffff;
    background-color: #da2ec4; // Strong pink for the button
    font-weight: bold;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #9a1252; // Darker shade on hover
    }
`;

export default function Hero() {
    return (
        <HeroContainer>
            <Title>Special Highlight</Title>
            <Description>
                Discover captivating stories with breathtaking visuals and emotional
                performances you can't miss.
            </Description>
            <HeroButton>Watch Now</HeroButton>
        </HeroContainer>
    );
}