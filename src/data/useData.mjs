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

  const mustMatchSearch= (search!=undefined && search!='')
  
  function _recordMatches(record) {
    let matchesShownValues= true
    let matchesSearchN= 0

    fields.map((f,fidx) => {
      if (!f.filterable) {
        return
      }
      if (f.value==undefined) {
        return
      }

      const fvalue= f.value(record)
      const shown= shownValues[fidx]
      if ((shown!=undefined) && (shown!='*')) {
        if (shown.indexOf(fvalue)<0) {
          matchesShownValues= false
        }
      }

      if (mustMatchSearch) {
        if (fvalue==undefined || fvalue=='') {
          return
        }

        const vv= fvalue.toString().toLowerCase()
        const fi= search.toLowerCase()

        
        if (vv.indexOf(fi)>=0) {
          matchesSearchN+= 1
        }
      }
    })

    const matchesSearch = mustMatchSearch
      ? matchesSearchN>0
      : true
    return matchesShownValues && matchesSearch
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