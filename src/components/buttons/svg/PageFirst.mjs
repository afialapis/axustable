import React from 'react'
import ButtonSVGBase from './ButtonSVGBase'

const PageFirst = (props) => 
  <ButtonSVGBase {...props }
                 className = "arrow-big-left-lines">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M12 15v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h3v6h-3z"></path>
    <path d="M21 15v-6"></path>
    <path d="M18 15v-6"></path>
  </ButtonSVGBase>

export default PageFirst
