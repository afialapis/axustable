import React from 'react'
import ButtonSVGBase from './ButtonSVGBase'

const PageLast = (props) => 
  <ButtonSVGBase {...props }
                 className = "arrow-big-right-lines">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-3v-6h3z"></path>
    <path d="M3 9v6"></path>
    <path d="M6 9v6"></path>
  </ButtonSVGBase>

export default PageLast
