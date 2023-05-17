import React from 'react'

const _isEven = (n) => n%2==0

const AxustableRow = ({ children, rowIndex }) => {
  return (
    <div className={`axt-row axt-row-${_isEven(rowIndex) ? 'even' : 'odd'} axt-row-${rowIndex}`}>
      {children}
    </div>
 )
}

export default AxustableRow
