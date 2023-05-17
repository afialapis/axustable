import React from 'react'

import Search from './search/Search.mjs'
import Menu from './menu/Menu.mjs'
import Pagination from './pagination/Pagination.mjs'


const AxustableToolbar = (
  {currentPage, pageCount, pageRows, dataLength, onChangePage, onChangePageRows, 
    filterable, searchable, paginable, hasSomeFilter, onClearFilter, exportable, onExportFile, search, onChangeSearch}) => {
  
  return (
    <div className="axt-toolbar">

      <div className="axt-toolbar-left">

        <Search searchable     = {searchable}
                search         = {search}
                onChangeSearch = {onChangeSearch}
        />
        
      </div>


      <div className="axt-toolbar-right">

        <Pagination
          paginable        = {paginable}
          rowCount         = {dataLength}
          currentPage      = {currentPage}
          pageCount        = {pageCount}
          onChangePage     = {onChangePage}
          pageRows         = {pageRows}
          onChangePageRows = {onChangePageRows}/>

        <Menu filterable    = {filterable}
              hasSomeFilter = {hasSomeFilter}
              onClearFilter = {onClearFilter}
              exportable    = {exportable}
              onExportFile  = {onExportFile}
              />
      </div>
    </div>
  )
}

export default AxustableToolbar

