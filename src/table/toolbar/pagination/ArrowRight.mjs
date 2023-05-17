import React from 'react'
import ArrowBase from './ArrowBase.mjs'

const ArrowRight = ({disabled, onClick}) => {
  return (
    <ArrowBase
      onClick  = {onClick} 
      disabled = {disabled}
      path     = "M1128 1719 c-10 -5 -18 -20 -18 -32 1 -12 47 -139 104 -282 l103 -260 -624 -5 c-604 -5 -625 -6 -639 -24 -21 -29 -21 -443 0 -472 14 -18 35 -19 639 -24 l624 -5 -103 -260 c-57 -143 -104 -270 -104 -282 0 -37 35 -48 73 -24 18 12 262 197 542 414 429 330 510 396 510 417 0 21 -65 75 -400 333 -536 412 -674 517 -683 517 -4 0 -15 -5 -24 -11z"
      />
  )
}


export default ArrowRight
