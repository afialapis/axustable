import { useState, useEffect, useCallback } from "react"

function _getInitialSort(config, fields) {
  if (config.sort.enabled===false) {
    return undefined
  }

  if ((fields==undefined) || (fields.length==0)) {
    return undefined
  }

  if (config.sort.initial!=undefined) {
    return config.sort.initial
  }

  return [0, 'asc']
}

function useSort(config, fields) {
  const [fieldIdx, order] = _getInitialSort(config, fields)
  const [sortIdx, setSortIdx] = useState(fieldIdx)
  const [sortOrder, setSortOrder]= useState(order)

  useEffect(() => {
    const [fieldIdx, order] = _getInitialSort(config, fields)

    setSortIdx(fieldIdx)
    setSortOrder(order)
  }, [config, fields])

  const handleSortChange= useCallback((fieldIdx) => {
    if (fields[fieldIdx].value!=undefined) {
      if (sortIdx==fieldIdx) {
        setSortOrder(sortOrder=='asc' ? 'desc' : 'asc')
      } else {
        setSortIdx(fieldIdx)
      }
    }
  }, [fields, sortIdx, sortOrder])


  return [config.sort.enabled!==false, sortIdx, sortOrder, handleSortChange]
}

export default useSort