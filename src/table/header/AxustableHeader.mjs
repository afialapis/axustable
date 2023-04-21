import React from 'react'
import AxustableHeaderField from './AxustableHeaderField.mjs'


const AxustableHeader = ({ fields, sort, sortable, filterable, filteredIndexes, onChangeSort, onOpenFilter }) =>
  <div className="axustable-header">
    {fields.map((f, i) => 
      <AxustableHeaderField
        key        = {`axustable_field_${i}`}
        field      = {f}
        filterable = {filterable}
        is_filtered= {filteredIndexes.indexOf(i)>=0}
        sortable   = {sortable}
        is_sorted  = {sort===undefined
                      ? undefined 
                      : i!=sort[0]
                        ? undefined
                        : sort[1]
                     }
        onChangeSort= {() => onChangeSort(i)}
        onOpenFilter= {() => onOpenFilter(i)}/>
    )}
  </div>

export default AxustableHeader
