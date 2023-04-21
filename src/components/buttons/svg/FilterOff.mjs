import React from 'react'
import ButtonSVGBase from './ButtonSVGBase'

const FilterOff = (props) => 
  <ButtonSVGBase {...props} 
                 className = "filter-off">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="3" y1="3" x2="21" y2="21"></line>
    <path d="M9 5h9.5a1 1 0 0 1 .5 1.5l-4.049 4.454m-.951 3.046v5l-4 -3v-4l-5 -5.5a1 1 0 0 1 .18 -1.316"></path>
  </ButtonSVGBase>

export default FilterOff


