import React from 'react'
import ButtonSVGBase from './ButtonSVGBase'

const Download = (props) => 
  <ButtonSVGBase {...props} 
                 className = "filter-off">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
    <polyline points="7 11 12 16 17 11"></polyline>
    <line x1="12" y1="4" x2="12" y2="16"></line>
  </ButtonSVGBase>

export default Download
