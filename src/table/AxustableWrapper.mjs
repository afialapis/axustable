import React from 'react'

function _getClassNames(className, config) {
  let cnames= []
  if (className) {
    cnames.push(className)
  }

  if (config.style.transparent!==false) {
    cnames.push('transparent')
  }

  if (config.style.bordered!==false) {
    cnames.push('bordered')
  }
  
  return cnames.join(' ')
}

const AxustableWrapper = ({className, config, children}) => {
  return (
    <div className={`axustable ${_getClassNames(className, config)}`}>
      {children}
    </div>    
  )
}


export default AxustableWrapper
