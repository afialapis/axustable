import {useState, useEffect} from 'react'
import { collSort } from 'farrapa/collections'


function _filterData(data, fields, filterData, search ) {
  if ( (data==undefined) || (data.length==0) || (typeof data != 'object') ) {
    return []
  }
  let shownValues= []

  fields.map((f, fidx) => {
    const ff= filterData[fidx]
    if (ff!=undefined) {
      shownValues.push(ff.filter((f) => f[1]==true).map((f) => f[0]))
    } else {
      shownValues.push('*')
    }
  })


  function _recordMatches(record) {
    let hide= 0
    fields.map((f,fidx) => {
      if (hide==1) {
        return
      }
      if (!f.filterable) {
        return
      }
      if (f.value==undefined) {
        return
      }
      if (filterData[fidx]==undefined) {
        return
      }
      const fvalue= f.value(record)
      
      if (shownValues[fidx]=='*'){
        return
      }

      if (shownValues[fidx].indexOf(fvalue)<0) {
        hide= 1
        return
      }

      if (search!=undefined && search!='') {
        if (fvalue==undefined || fvalue!='') {
          return
        }

        const vv= fvalue.toString().toLowerCase()
        const fi= search.toLowerCase()
        if (vv.indexOf(fi)<0) {
          hide= 1
        }
      }
    })
    return hide==0
  }
  
  return data.filter(_recordMatches)
}


function useData(data, fields, sortIdx, sortOrder, filterData, search) {

  const [parsedData, setParsedData]= useState(data!=undefined ? data : [])

  
  

  // On filter or sort change, reorder data
  useEffect(() => {
    const filteredData= _filterData(data, fields, filterData, search )
    
    setParsedData(collSort(filteredData, fields[sortIdx].sort_value, sortOrder))

  }, [data, fields, sortIdx, sortOrder, filterData, search])

  
  return parsedData

}

export default useData