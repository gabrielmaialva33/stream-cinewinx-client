'use client';

import styled from 'styled-components';

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    padding: 20px 40px;
    z-index: 10;
    background: rgba(41, 19, 38, 0.9); // Dark translucent background
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #da2ec4; // Pink for the title highlight
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    cursor: pointer;
`;

const NavMenu = styled.nav`
    ul {
        display: flex;
        gap: 2rem;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            font-size: 16px;
            color: #ced1d9; // Gray for menu items
            cursor: pointer;
            transition: opacity 0.2s;

            &:hover {
                color: #64cc95; // Green on hover
            }
        }
    }
`;

export default function Header() {
    return (
        <HeaderWrapper>
            <Title>𝐂𝐈𝐍𝐄𝐖𝐈𝐍𝐗™️</Title>
            <NavMenu>
                <ul>
                    <li>Home</li>
                    <li>Movies</li>
                    <li>TV Shows</li>
                    <li>My List</li>
                </ul>
            </NavMenu>
        </HeaderWrapper>
    );
}