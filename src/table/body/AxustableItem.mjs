import React from 'react'


const _isEven = (n) => n%2==0

const AxustableItem = ({ name, fieldIndex, className, children, style, empty }) =>
  <div data-name={name} 
       className={`axt-item axt-item-${_isEven(fieldIndex) ? 'even' : 'odd'} axt-item-${fieldIndex} ${empty ? 'axt-item-empty' : ''} ${className||''}` } 
       style={{...style}}>
    <div className="axt-item-inner">
      {children}
    </div>
  </div>




export default AxustableItem
