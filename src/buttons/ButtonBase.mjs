import React from 'react'

const ButtonBase = ({color= 'black', enabled, onClick, children}) => 
  <div className  = {`axustable-action-button ${enabled === false ? 'disabled' : ''}`}
        style     = {{color, cursor: "pointer"}}
        onClick   = {onClick}>
    {children}
  </div>

export default ButtonBase