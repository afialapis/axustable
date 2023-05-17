import React from 'react'

const Search = ({color= 'black', width= 24}) => 

    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width ={width || "24"}
      height={width || "24"}
      viewBox={`0 0 24 24`} 
      fill={color}
      strokeWidth="2" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="10" cy="10" r="7" fill="none"></circle>
        <line x1="21" y1="21" x2="15" y2="15"></line>
    </svg>



export default Search
