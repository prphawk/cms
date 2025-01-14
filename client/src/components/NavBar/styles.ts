import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const ContainerS = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 13rem;
  background-color: #5085a5;
  padding: 2rem 0;
`

export const LinkContainerS = styled.nav`
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
`

export const LinkS = styled(Link)<{ selected: boolean }>`
  background-color: transparent;
  width: -webkit-fill-available;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 1.2rem;
  padding: 0.6rem 1rem;
  margin: 0.5rem 0;
  text-decoration: none;
  border-radius: 0 2rem 2rem 0;

  ${({ selected }) =>
    selected &&
    css`
      background-color: #ffffff33;
    `}
`

export const LabelS = styled.p`
  font-size: 0.813rem;
  color: #ffffff;
  font-weight: 500;
`
