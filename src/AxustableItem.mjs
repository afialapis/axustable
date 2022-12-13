import React from 'react'

// const isEmpty = (children) =>
//  (children===null || children===undefined || (typeof children == 'string' && children.length==0))

const makeClasses = (cln) => {
  if (! cln) {
    return ''
  }
  const clns= cln.split(' ')
  let out=''
  clns.map((cl) => {
    out+= `axustable-item-${cl} `
  })
  return out
}

const AxustableItem = ({ name, className, children, style, empty }) =>
  <div data-name={name} className={`axustable-item ${makeClasses(className)} ${empty ? 'axustable-item-empty' : ''}`} style={{...style}}>
    <div className="axustable-item-inner">
      {children}
      </div>
  </div>




export default AxustableItem
