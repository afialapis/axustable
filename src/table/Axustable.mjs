import React, {useState, useEffect, useCallback} from 'react'
import {slugify} from 'farrapa/strings'
//import { collSort } from 'farrapa/collections'
import useConfig from '~config/useConfig.mjs'
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
import useFilter from 'src/state/useFilter.mjs'
import useData from 'src/data/useData.mjs'
import useDistincts from 'src/data/useDistincts.mjs'


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
  
  const [search, setSearch]= useState('')
  const [sortIdx, sortOrder, handleSortChange] = useSort(conf, flds)

  const distincts = useDistincts(flds, data)
 
  const [filteringField, filterData, filteredIndexes, 
         handleClearFilter, handleFilterOpen, 
         handleFilterClose, handleFilterSet] = useFilter(flds, distincts)

  //const [parsedData, setParsedData]= useState(data!=undefined ? data : [])
  const parsedData = useData(data, flds, sortIdx, sortOrder, filterData, search)

  


  

  const [pageCurrent, pageRows, pageCount, pageSubset, handleChangePageRows, handlePageChange] = usePagination(conf, flds, parsedData.length)

  const [exportable, handleExportFile] = useExport(conf, flds)


  //  // On filter or sort change, reorder data
  //  useEffect(() => {
  //    if ( (data==undefined) || (data.length==0) || (typeof data != 'object') ) {
  //      setParsedData([])
  //    } else {
  //      let filteredData= data.filter((rec) => {
  //        let hide= 0
  //        flds.map((f,fidx) => {
  //          if (f.value!=undefined) {
  //            if (filterData[fidx]!=undefined) {
  //              const hidden = filterData[fidx].filter((f) => f[1]==false).map((f) => f[0])
  //              if (hidden.indexOf(f.value(rec))>=0) {
  //                hide= 1
  //              }
  //            }
  //          }
  //        })
  //        return hide==0//found>0
  //      })
  //
  //      let nParsedData= []
  //      if (search!=undefined && search!='') {
  //
  //        nParsedData= filteredData.filter((rec) => {
  //          let show= 0
  //          flds.map(f => {
  //            if (f.value!=undefined) {
  //              const v= f.value(rec)
  //              if (v!=undefined && v!='') {
  //                const vv= v.toString().toLowerCase()
  //                const fi= search.toLowerCase()
  //                if (vv.indexOf(fi)>=0) {
  //                  show= 1
  //                }
  //              }
  //            }
  //          })
  //          return show==1
  //        })
  //      } else {
  //        nParsedData= filteredData
  //      }
  //              
  //
  //      setParsedData(collSort(nParsedData, flds[sortIdx].sort_value, sortOrder))
  //    }
  //
  //  }, [data, flds, sortIdx, sortOrder, filterData, search])
  //

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

