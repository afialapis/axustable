import React from 'react'
import ArrowBase from './ArrowBase.mjs'

const ArrowLeft = ({disabled, onClick}) => {
  return (
    <ArrowBase
      onClick  = {onClick} 
      disabled = {disabled}
      path     = "M943 1635 c-76 -57 -318 -243 -538 -412 -334 -258 -400 -312 -400 -333 0 -21 82 -88 510 -417 281 -217 524 -403 542 -414 38 -24 73 -13 73 24 -1 12 -47 139 -104 282 l-103 260 624 5 c604 5 625 6 639 24 21 29 21 443 0 472 -14 18 -35 19 -639 24 l-624 5 103 260 c57 143 104 270 104 282 0 19 -25 43 -44 43 -3 0 -67 -47 -143 -105z"
      />
  )
}


export default ArrowLeft