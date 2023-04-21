
import React from 'react'
import ButtonBase from './ButtonBase'


const ButtonTextBase = (props) => 
  <ButtonBase {...props }>
    {props.children}
  </ButtonBase>

export default ButtonTextBase
