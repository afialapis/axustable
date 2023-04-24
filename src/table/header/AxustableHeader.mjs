import React from 'react'
import AxustableHeaderField from './AxustableHeaderField.mjs'


const AxustableHeader = ({ fields, sortIdx, sortOrder, sortable, filterable, filteredIndexes, onChangeSort, onOpenFilter }) =>
  <div className="axustable-header">
    {fields.map((f, i) => 
      <AxustableHeaderField
        key        = {`axustable_field_${i}`}
        field      = {f}
        filterable = {filterable}
        is_filtered= {filteredIndexes.indexOf(i)>=0}
        sortable   = {sortable}
        is_sorted  = {i!=sortIdx
                      ? undefined
                      : sortOrder
                     }
        onChangeSort= {() => onChangeSort(i)}
        onOpenFilter= {() => onOpenFilter(i)}/>
    )}
  </div>

export default AxustableHeader
