import styled from 'styled-components'

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton
} from '../button/button.styles'

export const CartDropdownContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;

  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  /* example of nested styling in
    styled-components 
   */
  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
  }

  /* button {
    // width: fit-content;
    // font-family: 'Open Sans Condensed';
    display: inline;
    // width: auto;
    margin-top: auto;
  } */
`

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;

  /* ${CartDropdownContainer} {
  } */
`

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`
