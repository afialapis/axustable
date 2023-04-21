
import React from 'react'
import ButtonBase from '../ButtonBase'

/**
 * https://tabler-icons.io/
 */

const ButtonSVGBase = (props) => 
  <ButtonBase {...props }>
    <svg 
      xmlns="http://www.w3.org/2000/svg"   
      className={`icon icon-tabler icon-tabler-${props.className}`}
      width ={props.width || "24"}
      height={props.width || "24"}
      viewBox={`0 0 24 24`} 
      strokeWidth="2" stroke="currentColor" fill="none" 
      strokeLinecap="round" strokeLinejoin="round">
        {props.children}
    </svg>
  </ButtonBase>

export default ButtonSVGBase
