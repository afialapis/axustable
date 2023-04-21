import React from 'react'
import ButtonSVGBase from './ButtonSVGBase'

const Search = (props) => 
  <ButtonSVGBase {...props }
                 className = "search">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <circle cx="10" cy="10" r="7"></circle>
    <line x1="21" y1="21" x2="15" y2="15"></line>
  </ButtonSVGBase>

export default Search
