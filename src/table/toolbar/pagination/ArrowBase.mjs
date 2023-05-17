import React from 'react'

const COLORS= {
  default: '#000000',
  disabled: 'gray'
}


const ArrowIcon = ({width, path, onClick, disabled}) => {
  
  const style= {
    userSelect: 'none'
  }
  if ( (!disabled) && (onClick!=undefined)) {
    style['pointer']= 'cursor'
  }
  const color= disabled===true ? COLORS.disabled : COLORS.default

  return (
    <div className = {`arrow ${disabled ? 'disabled' : ''}`}
         onClick   = {onClick}>
      <svg version = "1.0"
          xmlns   = "http://www.w3.org/2000/svg"
          width   = {width || 18}
          height  = {width || 18}
          viewBox = {`0 0 224 177`}
          preserveAspectRatio = "xMidYMid meet">

        <g transform  = {`translate(0,177) scale(0.1, -0.1)`}
          fill        = "none" 
          stroke      = "none">

          <path fill={color || '#FFFFFF'}
                d={path}/>
        </g>
      </svg>
    </div>  
  )
}

export default ArrowIcon