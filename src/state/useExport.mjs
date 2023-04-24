import {useState, useCallback, useEffect} from 'react'
import {utils as xlsx_utils, writeFile as xlsx_write} from 'xlsx'

function _getExportFields(config, fields) {
  if (config.export.enabled===false) {
    return undefined
  }

  if ((fields==undefined) || (fields.length==0)) {
    return undefined
  }

  if (config.export.fields!=undefined) {
    return config.export.fields
  }

  return fields
    .filter(f => {
      return ((f?.name!=undefined) || (f?.value!=undefined))
    })
    .map(f => {
      return {
        name: f?.name,
        label: f?.label || f?.name || '--',
        value: f?.value
      }
    })
}


function _getExportName(config) {
  if (config.export.enabled===false) {
    return undefined
  }

  if (config.export.name!=undefined) {
    return config.export.name
  }

  return 'document'
}



function useExport(config, fields) {

  const [exportFields, setExportFields]= useState(_getExportFields(config, fields))
  const [exportName, setExportName]= useState(_getExportName(config))

  useEffect(() => {
    setExportFields(_getExportFields(config, fields))
  }, [config, fields])

  useEffect(() => {
    setExportName(_getExportName(config))
  }, [config])


  const handleExportFile = useCallback((data) => {
    if (exportFields==undefined) return
    if (exportFields.length==0) return
     
     const fieldLabelsList = exportFields.map(f => f.label)
 
     const arrayOfArrays= [
       fieldLabelsList
     ]
 
     data.map(record => {
       let row= []
       for (const f of exportFields) {
         
         let value= f.value!=undefined
           ? f.value(record)
           : record[f.name]
 
         row.push(value)
       }
       arrayOfArrays.push(row)
     })
 
     let workbook = xlsx_utils.book_new()
     let worksheet = xlsx_utils.aoa_to_sheet(arrayOfArrays, {})
     xlsx_utils.book_append_sheet(workbook, worksheet, exportName)
     xlsx_write(workbook, exportName + '.xlsx')
 
  }, [exportName, exportFields])

  return [config.export.enabled!==false, handleExportFile]

}


export default useExport