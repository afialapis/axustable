import React from 'react'
import ButtonSVGBase from './ButtonSVGBase'

const PageLeft = (props) => 
  <ButtonSVGBase {...props }
                 className = "arrow-big-left">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M20 15h-8v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h8a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1z"></path>
  </ButtonSVGBase>

export default PageLeft
