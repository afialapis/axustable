import {useState, useEffect} from 'react'
import {toTitleCase} from 'farrapa/strings'


function _getFields (fields, config) {
  return fields.map(f => {
    const _def_value = (record) => record[f.name]
    const _def_render = (record, onEvent) => record[f.name]

    const sortable = f?.sortable===false
      ? false
      : config.sort.enabled
    
    const sort_value = typeof f?.sort_value == 'function'
      ? f.sort_value
      : _def_value

    const filterable = f?.filterable===false
      ? false
      : config.filterable      

    return {
      name: f.name,
      label: f?.label || toTitleCase(f.name),
      className: f?.className,
      value: f?.value || _def_value,
      render: f?.render || _def_render,
      sortable,
      sort_value,
      filterable
    }
  })
}

function useFields (fields, config) {
  const [innerFields, setInnerFields]= useState(_getFields(fields, config))

  useEffect(() => {
    setInnerFields(_getFields(fields, config))
  }, [fields, config])

  return innerFields
}

export default useFields