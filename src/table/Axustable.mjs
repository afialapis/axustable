import React, {useState, useEffect, useCallback} from 'react'
import {slugify} from 'farrapa/strings'
import { collSort } from 'farrapa/collections'
import useConfig from '~config/useConfig.mjs'
//import { getStorageKey, useStoragedState } from '~storage/index.mjs'
import AxustableActions from '~table/actions/AxustableActions.mjs'
import AxustableHeader from '~table/header/AxustableHeader.mjs'
import AxustableRow from '~table/body/AxustableRow.mjs'
import AxustableItem from '~table/body/AxustableItem.mjs'
import AxustableFilterModal from '~table/AxustableFilterModal.mjs'
import useSort from 'src/state/useSort.mjs'
import useExport from 'src/state/useExport.mjs'

import AxustableWrapper from './AxustableWrapper.mjs'
import useFields from 'src/state/useFields.mjs'
import usePagination from 'src/state/usePagination.mjs'


const Axustable = (
  { fields, 
    data, 
    config,
    makeKey, 
    makeClassName, 
    onEvent, 
    className
  }) => {


  const conf = useConfig(config)
  const flds = useFields(fields, conf)
  
  const [sortIdx, sortOrder, handleSortChange] = useSort(conf, flds)

  const [parsedData, setParsedData]= useState(data!=undefined ? data : [])
  
  const [filteringField, setFilteringField]= useState(undefined)
  const [filterData, setFilterData]= useState([])
  const [filteredIndexes, setFilteredIndexes]= useState([])

  const [search, setSearch]= useState('')

  const [pageCurrent, pageRows, pageCount, pageSubset, handleChangePageRows, handlePageChange] = usePagination(conf, flds, parsedData.length)

  // const [pageRows, setPageRows]= useStoragedState(conf.pages.rows, getStorageKey(flds))
  // const [pageCurrent, setPageCurrent]= useState(1)
  // const [pageSubset, setPageSubset]= useState(undefined)
  // const [pageCount, setPageCount]= useState(1)

  const [exportable, handleExportFile] = useExport(conf, flds)


  // On filter or sort change, reorder data
  useEffect(() => {
    if ( (data==undefined) || (data.length==0) || (typeof data != 'object') ) {
      setParsedData([])
    } else {
      let filteredData= data.filter((rec) => {
        let hide= 0
        flds.map((f,fidx) => {
          if (f.value!=undefined) {
            if (filterData[fidx]!=undefined) {
              const hidden = filterData[fidx].filter((f) => f[1]==false).map((f) => f[0])
              if (hidden.indexOf(f.value(rec))>=0) {
                hide= 1
              }
            }
          }
        })
        return hide==0//found>0
      })

      let nParsedData= []
      if (search!=undefined && search!='') {

        nParsedData= filteredData.filter((rec) => {
          let show= 0
          flds.map(f => {
            if (f.value!=undefined) {
              const v= f.value(rec)
              if (v!=undefined && v!='') {
                const vv= v.toString().toLowerCase()
                const fi= search.toLowerCase()
                if (vv.indexOf(fi)>=0) {
                  show= 1
                }
              }
            }
          })
          return show==1
        })
      } else {
        nParsedData= filteredData
      }
              

      setParsedData(collSort(nParsedData, flds[sortIdx].sort_value, sortOrder))
    }

  }, [data, flds, sortIdx, sortOrder, filterData, search])


  //  // When data changes, recalc page count
  //  useEffect(( )=> {
  //
  //    let nPageCount= 1
  //    if (parsedData!=undefined) {
  //      if (parsedData.length>0) {
  //        const div= parsedData.length / pageRows
  //        const mod= parsedData.length % pageRows
  //      
  //        nPageCount= parseInt(div) + (mod>0 ? 1 : 0)
  //      }
  //    }
  //    setPageCount(nPageCount)
  //  }, [parsedData, pageRows])
  //  
  //
  //  // When data or current page changes, move data subset
  //  useEffect(()=> {
  //    if (pageCurrent>pageCount) {
  //      setPageCurrent(pageCount)
  //    }   
  //  }, [pageCurrent, pageCount])
  //
  //
  //  // When data or current page changes, move data subset
  //  useEffect(()=> {
  //    if (conf.pages.enabled!==false) {
  //      const nFrom= (pageCurrent-1)*pageRows
  //      const nTo= Math.min(pageCurrent*pageRows, parsedData.length)
  //      setPageSubset([nFrom, nTo])
  //    } else {
  //      setPageSubset([0, parsedData.length])
  //    }
  //
  //  }, [conf.pages.enabled, parsedData, pageCurrent, pageRows])


  useEffect(() => {

    let fIndexes= []
    filterData.map((col,idx) => {
      if (col!=undefined) {
        col.map((value,_) => {
          const [_val,show]= value
          if (show==false) {
            fIndexes.push(idx)
            return  
          }
        })
        
      }
    })
    setFilteredIndexes(fIndexes)

  }, [filterData])

  const handleClearFilter = useCallback(() => {
    let zeroFilter= flds.map((_) => undefined)
    setFilterData(zeroFilter)
  }, [flds])
  

//  const handlePageChange = useCallback((page) => {
//    if (page>=1 && page<=pageCount) {
//      setPageCurrent(page)
//    }
//  }, [pageCount])
//
  const handleFilterOpen= useCallback((fieldIdx, field) => {
    if (field.filterable) {
    
      if (filterData[fieldIdx] == undefined) {
        let nFilterData= [...filterData]
        const distincts= new Set(parsedData.map((rec) => field.value(rec)))
        console.log(distincts)
        const fdata= Array.from(distincts).map((e) => [e, true])
        nFilterData[fieldIdx]= fdata
        setFilterData(nFilterData)
      }
      setFilteringField(fieldIdx)
    }
  }, [filterData, parsedData])

  const handleFilterClose = useCallback(() => {
    setFilteringField(undefined)
  }, [])

  const handleFilterSet = useCallback((filteringField, values) => {
    const nFilterData= [...filterData]
    nFilterData[filteringField]= values
    setFilterData(nFilterData)
    setFilteringField(undefined)
  }, [filterData])
  
  return (
    <AxustableWrapper config={conf}
                      className={className}>
      {conf.pages.enabled===true || conf.filterable===true || conf.searchable===true
       ? 
        <AxustableActions  pageCurrent = {pageCurrent}
                          pageCount   = {pageCount}
                          pageRows    = {pageRows}
                          dataLength  = {parsedData.length}
                          onChangePage = {(p) => handlePageChange(p)}
                          onChangePageRows={(r) => handleChangePageRows(r)}
                          filterable   ={conf.filterable}
                          hasSomeFilter={filteredIndexes.length > 0}
                          onClearFilter={() => handleClearFilter()}
                          search       = {search}
                          onChangeSearch= {(v) => setSearch(v)}
                          paginable    = {conf.pages.enabled}
                          searchable   = {conf.searchable}
                          exportable    = {exportable}
                          onExportFile = {() => handleExportFile(parsedData)}


                            />
       : null}
      <div className={'axustable-table-wrap'}>
        <div className={'axustable-table'}>
          <AxustableHeader fields      = {flds}
                          sortIdx     = {sortIdx}
                          sortOrder   = {sortOrder}
                          filterable    = {conf.filterable}
                          filteredIndexes={filteredIndexes}
                          onChangeSort= {(sby, field) => handleSortChange(sby, field)}
                          onOpenFilter= {(fby, field) => handleFilterOpen(fby, field)}/>           
            {/* Wait until pageSubset is computed, if not we would be rendering every row*/}
            {pageSubset==undefined
            ? null
            : parsedData.slice(pageSubset[0], pageSubset[1]).map((record, didx) => 
                <AxustableRow key= {makeKey(record)}
                            className={makeClassName ? makeClassName(record) : ''}>
                  {flds.map((field, fidx) => 
                      <AxustableItem key  = {`${makeKey(record)}_${didx}_${fidx}_${slugify(field.label)}`}
                                    name = {field.label}
                                    empty = {field.empty!=undefined ? field.empty(record) : false}
                                    className={field.className}>
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
        </div>
      </div>
      <AxustableFilterModal show={filteringField!=undefined}
                           title={filteringField!=undefined ? `Filtro por ${flds[filteringField].label}` : ''}
                           filterData={filterData[filteringField] || []}
                           onClose={() => handleFilterClose()}
                           onSubmit={(values) => {handleFilterSet(filteringField, values)}}/>
    </AxustableWrapper>
  )
}
export default Axustable

