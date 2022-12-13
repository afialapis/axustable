import React, {useState, useEffect, useCallback} from 'react'
import AxustableActions from './AxustableActions.mjs'
import AxustableHeader from './AxustableHeader.mjs'
import AxustableRow from './AxustableRow.mjs'
import AxustableItem from './AxustableItem.mjs'
import AxustableFilterModal from './AxustableFilterModal.mjs'

import {slugify} from 'farrapa-strings'
import { collSort } from 'farrapa-collections'
import { useStoragedState } from './storage/useStoragedState.mjs'
import {utils as xlsx_utils, writeFile as xlsx_write} from 'xlsx'

const AXUSTABLE_DEFAULTS= {
  pageRows: 15
}

const getAxustableKey = (fields) => {
  const flds= fields.map((f) => f.label).join('_').toLowerCase()
  let num=0
  flds.split('').map((c) => {num+= c.charCodeAt()})
  return `axustable_rows_${num}`
}



const Axustable = (
  { fields, 
    data, 
    sortable= true, 
    filterable= true, 
    paginable= true, 
    searchable= true, 
    exportable= false, 
    transparent = false, 
    bordered = true,
    initialSort, 
    makeKey, 
    makeClassName, 
    onEvent, 
    className, 
    exportFields,
    exportName= 'document'
     }) => {

  const [parsedData, setParsedData]= useState(data!=undefined ? data : [])
  const [sort, setSort]= useState(initialSort)
  
  const [filteringField, setFilteringField]= useState(undefined)
  const [filterData, setFilterData]= useState([])
  const [filteredIndexes, setFilteredIndexes]= useState([])

  const [search, setSearch]= useState('')

  const [pageRows, setPageRows]= useStoragedState(AXUSTABLE_DEFAULTS.pageRows, getAxustableKey(fields))
  const [pageCurrent, setPageCurrent]= useState(1)
  const [pageSubset, setPageSubset]= useState(undefined)
  const [pageCount, setPageCount]= useState(1)


  // On filter or sort change, reorder data
  useEffect(() => {
    if ( (data==undefined) || (data.length==0) || (typeof data != 'object') ) {
      setParsedData([])
    } else {
      let filteredData= data.filter((rec) => {
        let hide= 0
        fields.map((f,fidx) => {
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
          fields.map(f => {
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
              

      const fieldIdx= sort[0]
      const way= sort[1]      
      setParsedData(collSort(nParsedData, fields[fieldIdx].value, way))
    }

  }, [data, fields, sort, filterData, search])


  // When data changes, recalc page count
  useEffect(( )=> {

    let nPageCount= 1
    if (parsedData!=undefined) {
      if (parsedData.length>0) {
        const div= parsedData.length / pageRows
        const mod= parsedData.length % pageRows
      
        nPageCount= parseInt(div) + (mod>0 ? 1 : 0)
      }
    }
    setPageCount(nPageCount)
  }, [parsedData, pageRows])
  

  // When data or current page changes, move data subset
  useEffect(()=> {
    if (pageCurrent>pageCount) {
      setPageCurrent(pageCount)
    }   
  }, [pageCurrent, pageCount])


  // When data or current page changes, move data subset
  useEffect(()=> {
    if (paginable!==false) {
      const nFrom= (pageCurrent-1)*pageRows
      const nTo= Math.min(pageCurrent*pageRows, parsedData.length)
      setPageSubset([nFrom, nTo])
    } else {
      setPageSubset([0, parsedData.length])
    }

  }, [paginable, parsedData, pageCurrent, pageRows])


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
    let zeroFilter= fields.map((_) => undefined)
    setFilterData(zeroFilter)
  }, [fields])
  

  const handlePageChange = useCallback((page) => {
    if (page>=1 && page<=pageCount) {
      setPageCurrent(page)
    }
  }, [pageCount])

  const handleSortChange= useCallback((fieldIdx) => {
    if (fields[fieldIdx].value!=undefined) {
      let way= 'asc'
      if (sort[0]==fieldIdx) {
        if (sort[1]=='asc') {
          way= 'desc'
        }
      }
      setSort([fieldIdx, way])
    }
  }, [fields, sort])

  const handleFilterOpen= useCallback((fieldIdx) => {
    if (fields[fieldIdx].value!=undefined) {
    
      if (filterData[fieldIdx] == undefined) {
        let nFilterData= [...filterData]
        const distincts= new Set(parsedData.map((rec) => fields[fieldIdx].value(rec)))
        const fdata= Array.from(distincts).map((e) => [e, true])
        nFilterData[fieldIdx]= fdata
        setFilterData(nFilterData)
      }
      setFilteringField(fieldIdx)
    }
  }, [fields, filterData, parsedData])

  const handleFilterClose = useCallback(() => {
    setFilteringField(undefined)
  }, [])

  const handleFilterSet = useCallback((filteringField, values) => {
    const nFilterData= [...filterData]
    nFilterData[filteringField]= values
    setFilterData(nFilterData)
    setFilteringField(undefined)
  }, [filterData])

  const handleExportFile = useCallback(() => {
   if (exportFields==undefined) return
   if (exportFields.length==0) return
    
    const fieldLabelsList = exportFields.map(f => f.label)

    const arrayOfArrays= [
      fieldLabelsList
    ]

    parsedData.map(record => {
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

  }, [parsedData, exportName, exportFields])


  return (
    <div className={`axustable ${className || ''} ${transparent ? 'transparent' : ''} ${bordered===false ? '' : 'bordered'}`}>
      {paginable===true || filterable===true || searchable===true
       ? 
        <AxustableActions  pageCurrent = {pageCurrent}
                          pageCount   = {pageCount}
                          pageRows    = {pageRows}
                          dataLength  = {parsedData.length}
                          onChangePage= {(p) => handlePageChange(p)}
                          onChangePageRows={(r) => setPageRows(r)}
                          filterable   ={filterable}
                          hasSomeFilter={filteredIndexes.length > 0}
                          onClearFilter={() => handleClearFilter()}
                          search   = {search}
                          onChangeSearch= {(v) => setSearch(v)}
                          paginable    = {paginable}
                          searchable   = {searchable}
                          exportable   = {exportable}
                          onExportFile = {() => handleExportFile()}


                            />
       : null}
      <div className={'axustable-table-wrap'}>
        <div className={'axustable-table'}>
          <AxustableHeader fields      = {fields}
                          sort        = {sort}
                          sortable    = {sortable}
                          filterable    = {filterable}
                          filteredIndexes={filteredIndexes}
                          onChangeSort= {(sby) => handleSortChange(sby)}
                          onOpenFilter= {(fby) => handleFilterOpen(fby)}/>           
            {/* Wait until pageSubset is computed, if not we would be rendering every row*/}
            {pageSubset==undefined
            ? null
            : parsedData.slice(pageSubset[0], pageSubset[1]).map((record, didx) => 
                <AxustableRow key= {makeKey(record)}
                            className={makeClassName ? makeClassName(record) : ''}>
                  {fields.map((field, fidx) => 
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
                           title={filteringField!=undefined ? `Filtro por ${fields[filteringField].label}` : ''}
                           filterData={filterData[filteringField] || []}
                           onClose={() => handleFilterClose()}
                           onSubmit={(values) => {handleFilterSet(filteringField, values)}}/>
    </div>
  )
}
export default Axustable

