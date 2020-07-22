import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid;
    border-radius: 50%;
    animation: ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props) => props.theme.colors.loading} transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.15s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.45s;
  }
  @keyframes ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const LoadingIndicator: FunctionComponent<{}> = () => (
  <Loader>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </Loader>
)
