import {useState, useEffect, useCallback} from 'react'
import { getStorageKey, useStoragedState } from '~storage/index.mjs'

function usePagination (config, fields, dataLength) {
  const [pageRows, setPageRows]= useStoragedState(config.pages.rows, getStorageKey(fields))
  const [pageCurrent, setPageCurrent]= useState(1)
  const [pageSubset, setPageSubset]= useState(undefined)
  const [pageCount, setPageCount]= useState(1)


  // When data changes, recalc page count
  useEffect(( )=> {
    let nPageCount= 1

    if (dataLength>0) {
      const div= dataLength / pageRows
      const mod= dataLength % pageRows
    
      nPageCount= parseInt(div) + (mod>0 ? 1 : 0)
    }
    setPageCount(nPageCount)
  }, [dataLength, pageRows])
  

  // When data or current page changes, move data subset
  useEffect(()=> {
    if (pageCurrent>pageCount) {
      setPageCurrent(pageCount)
    }   
  }, [pageCurrent, pageCount])


  // When data or current page changes, move data subset
  useEffect(()=> {
    if (config.pages.enabled!==false) {
      const nFrom= (pageCurrent-1)*pageRows
      const nTo= Math.min(pageCurrent*pageRows, dataLength)
      setPageSubset([nFrom, nTo])
    } else {
      setPageSubset([0, dataLength])
    }

  }, [config.pages.enabled, dataLength, pageCurrent, pageRows])


  const handleChangePageRows = useCallback((v) => {
    setPageRows(v)
  }, [setPageRows])

  const handlePageChange = useCallback((page) => {
    if (page>=1 && page<=pageCount) {
      setPageCurrent(page)
    }
  }, [pageCount])


  return [pageCurrent, pageRows, pageCount, pageSubset, handleChangePageRows, handlePageChange]
}

export default usePagination




