import React from 'react'
import ArrowBase from './ArrowBase.mjs'

const ArrowDown = ({disabled, onClick}) => {
  return (
    <ArrowBase
      onClick  = {onClick} 
      disabled = {disabled}
      path     = "M644 2186 c-18 -14 -19 -35 -24 -639 l-5 -624 -260 103 c-143 57 -270 104 -282 104 -37 0 -48 -35 -24 -73 12 -18 197 -261 414 -542 330 -429 396 -510 417 -510 21 0 87 82 417 510 217 281 403 524 414 542 24 38 13 73 -24 73 -12 -1 -139 -47 -282 -104 l-260 -103 -5 624 c-5 604 -6 625 -24 639 -29 21 -443 21 -472 0z"
      />
  )
}


export default ArrowDown
