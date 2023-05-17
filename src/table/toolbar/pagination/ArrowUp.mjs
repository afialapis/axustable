import React from 'react'
import ArrowBase from './ArrowBase.mjs'

const ArrowUp = ({disabled, onClick}) => {
  return (
    <ArrowBase
      onClick  = {onClick} 
      disabled = {disabled}
      path     = "M854 2218 c-28 -31 -776 -1006 -798 -1040 -21 -33 -7 -68 27 -68 12 1 139 47 282 104 l260 103 5 -624 c5 -604 6 -625 24 -639 29 -21 443 -21 472 0 18 14 19 35 24 639 l5 624 260 -103 c143 -57 270 -104 282 -104 37 0 48 35 24 73 -12 18 -197 262 -413 542 -260 337 -400 511 -413 513 -12 2 -30 -7 -41 -20z"
      />
  )
}


export default ArrowUp

