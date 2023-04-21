import React from 'react'

const AxustableRow = ({ children, className }) => {
  return (
    <div className={`axustable-row ${className || ''}`}>
      {children}
    </div>
 )
}

export default AxustableRow
