import {useState, useEffect, useCallback} from 'react'
import { getStorageKey, useStoragedState } from '~storage/index.mjs'

function usePagination (config, fields, dataLength) {
  const [pageRows, setPageRows]= useStoragedState(config.pages.rows, getStorageKey(fields))
  const [currentPage, setcurrentPage]= useState(1)
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
    if (currentPage>pageCount) {
      setcurrentPage(pageCount)
    }   
  }, [currentPage, pageCount])


  // When data or current page changes, move data subset
  useEffect(()=> {
    if (config.pages.enabled!==false) {
      const nFrom= (currentPage-1)*pageRows
      const nTo= Math.min(currentPage*pageRows, dataLength)
      setPageSubset([nFrom, nTo])
    } else {
      setPageSubset([0, dataLength])
    }

  }, [config.pages.enabled, dataLength, currentPage, pageRows])


  const handleChangePageRows = useCallback((v) => {
    setPageRows(v)
  }, [setPageRows])

  const handlePageChange = useCallback((page) => {
    if (page>=1 && page<=pageCount) {
      setcurrentPage(page)
    }
  }, [pageCount])


  return [currentPage, pageRows, pageCount, pageSubset, handleChangePageRows, handlePageChange]
}

export default usePagination




