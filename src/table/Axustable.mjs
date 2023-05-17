import React, {useState} from 'react'

import AxustableWrapper from './AxustableWrapper.mjs'
import AxustableToolbar from '~table/toolbar/AxustableToolbar.mjs'
import AxustableHeader from '~table/header/AxustableHeader.mjs'
import AxustableBody from '~table/body/AxustableBody.mjs'
import AxustableFilterModal from '~table/AxustableFilterModal.mjs'

import useConfig from '~config/useConfig.mjs'
import useSort from 'src/state/useSort.mjs'
import useExport from 'src/state/useExport.mjs'
import useFields from 'src/state/useFields.mjs'
import usePagination from 'src/state/usePagination.mjs'
import useFilter from 'src/state/useFilter.mjs'
import useData from 'src/data/useData.mjs'
import useDistincts from 'src/data/useDistincts.mjs'


const Axustable = (
  { fields, 
    data, 
    config,
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

  const parsedData = useData(data, flds, sortIdx, sortOrder, filterData, search)

  const [currentPage, pageRows, pageCount, pageSubset, handleChangePageRows, handlePageChange] = usePagination(conf, flds, parsedData.length)

  const [exportable, handleExportFile] = useExport(conf, flds)

  return (
    <AxustableWrapper config={conf}
                      className={className}>
      {conf.pages.enabled===true || conf.filterable===true || conf.searchable===true
       ? 
        <AxustableToolbar currentPage     = {currentPage}
                          pageCount       = {pageCount}
                          pageRows        = {pageRows}
                          dataLength      = {parsedData.length}
                          onChangePage    = {(p) => handlePageChange(p)}
                          onChangePageRows= {(r) => handleChangePageRows(r)}
                          filterable      = {conf.filterable}
                          hasSomeFilter   = {filteredIndexes.length > 0}
                          onClearFilter   = {() => handleClearFilter()}
                          search          = {search}
                          onChangeSearch  = {(v) => {console.log(v); setSearch(v)}}
                          paginable       = {conf.pages.enabled}
                          searchable      = {conf.searchable}
                          exportable      = {exportable}
                          onExportFile    = {() => handleExportFile(parsedData)}


                            />
       : null}
      <div className={'axt-table-wrap'}>
        <div className={'axt-table'}>
          <AxustableHeader fields      = {flds}
                          sortIdx     = {sortIdx}
                          sortOrder   = {sortOrder}
                          filterable    = {conf.filterable}
                          filteredIndexes={filteredIndexes}
                          onChangeSort= {(sby, field) => handleSortChange(sby, field)}
                          onOpenFilter= {(fby, field) => handleFilterOpen(fby, field)}/> 

            <AxustableBody 
                          parsedData = {parsedData}
                          pageSubset = {pageSubset}
                          fields     = {fields}
                          onEvent    = {onEvent}/>
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

