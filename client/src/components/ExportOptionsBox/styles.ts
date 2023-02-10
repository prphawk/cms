import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  right: 5%;
  top: 2rem;

  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #00000033;
  z-index: 5;
  width: max-content;
`

export const TransparentButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0.7rem;
  text-align: left;
  font-weight: 500;
  display: flex;

  & svg {
    margin-right: 0.5rem;
  }
`