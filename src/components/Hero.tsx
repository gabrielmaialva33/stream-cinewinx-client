'use client';

import styled from 'styled-components';

// Estilos do container principal do Hero
const HeroContainer = styled.div`
    position: relative;
    color: white;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 40px;

    // Fundo com sobreposição de cores suaves
    background: linear-gradient(
            rgba(41, 19, 38, 0.7),
            rgba(41, 19, 38, 0.7)
    ),
    url('https://raw.githubusercontent.com/gabrielmaialva33/cinewinx-api/refs/heads/main/.github/assets/logo.jpg') no-repeat center center / cover;
`;

// Título com destaque de cor coeso
const Title = styled.h1`
    font-size: 3.5rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #64cc95; // Verde claro para destaque principal
`;

// Descrição em tom secundário
const Description = styled.p`
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 600px;
    line-height: 1.5;
    color: #ced1d9; // Texto mais suave
`;

// Botão de ação
const HeroButton = styled.button`
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    color: #ffffff;
    background-color: #da2ec4; // Rosa forte para botão
    font-weight: bold;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #9a1252; // Tom mais escuro no hover
    }
`;

export default function Hero() {
    return (
        <HeroContainer>
            <Title>Destaque Especial</Title>
            <Description>
                Explore histórias fascinantes com visuais deslumbrantes e performances
                emocionantes que você não pode perder.
            </Description>
            <HeroButton>Assista Agora</HeroButton>
        </HeroContainer>
    );
}