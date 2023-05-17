import React from 'react'
import AxustableRow from './AxustableRow.mjs'
import AxustableItem from './AxustableItem.mjs'

const AxustableBody = ({ parsedData, pageSubset, fields, onEvent }) => {
  
  /* Wait until pageSubset is computed, if not we would be rendering every row*/
  if (pageSubset==undefined) {
    return null
  }


  return (
    <>
    { parsedData.slice(pageSubset[0], pageSubset[1]).map((record, didx) => 
      <AxustableRow key= {`axt-row-${didx}`}
                    rowIndex={didx}>
        {fields.map((field, fidx) => 
            <AxustableItem key       = {`axt-row-${didx}-field-${fidx}`}
                          fieldIndex= {fidx}
                          name      = {field.label}
                          empty     = {field.empty!=undefined ? field.empty(record) : false}
                          className = {field.className}>
              {field.render!=undefined
              ? field.render(record, onEvent)
              : field.value!=undefined
                ? field.value(record)
                : record[field.name]
              }
            </AxustableItem>          
        )}
      </AxustableRow>
    )}
    </>
 )
}

export default AxustableBody
