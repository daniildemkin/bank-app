import React from 'react'
import styled from 'styled-components'

interface ICardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

const StyledCard = styled.div<{ $hover?: boolean }>`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.3s ease;

  ${({ $hover }) =>
    $hover &&
    `
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `}
`

const Card: React.FC<ICardProps> = ({ children, className, onClick, hover = true }) => {
  return (
    <StyledCard
      className={className}
      onClick={onClick}
      $hover={hover}
    >
      {children}
    </StyledCard>
  )
}

export default Card
