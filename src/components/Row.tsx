'use client';
import styled from 'styled-components';

interface RowProps {
  title: string;
  fetchUrl: string;
}

export default function Row({ title }: RowProps) {
  return (
    <RowContainer>
      <RowTitle>{title}</RowTitle>
      <RowContent>
        <RowItem>Movie 1</RowItem>
        <RowItem>Movie 2</RowItem>
        <RowItem>Movie 3</RowItem>
      </RowContent>
    </RowContainer>
  );
}

const RowContainer = styled.div`
  margin: 2rem;
`;

const RowTitle = styled.h2`
  margin-bottom: 1rem;
`;

const RowContent = styled.div`
  display: flex;
  gap: 1rem;
`;

const RowItem = styled.div`
  width: 150px;
  height: 225px;
  background: gray;
  border-radius: 8px;
`;
