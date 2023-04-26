import React from 'react'
import AxustableHeaderField from './AxustableHeaderField.mjs'


const AxustableHeader = ({ fields, sortIdx, sortOrder, filterable, filteredIndexes, onChangeSort, onOpenFilter }) =>
  <div className="axustable-header">
    {fields.map((f, i) => 
      <AxustableHeaderField
        key        = {`axustable_field_${i}`}
        field      = {f}
        filterable = {filterable}
        is_filtered= {filteredIndexes.indexOf(i)>=0}
        is_sorted  = {i!=sortIdx
                      ? undefined
                      : sortOrder
                     }
        onChangeSort= {() => onChangeSort(i, f)}
        onOpenFilter= {() => onOpenFilter(i, f)}/>
    )}
  </div>

export default AxustableHeader
