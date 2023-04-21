import React from 'react'
import ButtonSVGBase from './ButtonSVGBase'

const FilterOn = (props) => 
  <ButtonSVGBase {...props }
                 className = "filter-on">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M5.5 5h13a1 1 0 0 1 .5 1.5l-5 5.5l0 7l-4 -3l0 -4l-5 -5.5a1 1 0 0 1 .5 -1.5"></path>
  </ButtonSVGBase>

export default FilterOn
