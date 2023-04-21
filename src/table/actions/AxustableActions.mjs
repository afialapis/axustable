import React, {useState} from 'react'
import Download from '~components/buttons/svg/Download.mjs'
import Search from '~components/buttons/svg/Search.mjs'
import FilterOn from '~components/buttons/svg/FilterOn.mjs'
import FilterRemove from '~components/buttons/svg/FilterRemove.mjs'

const AXUSTABLE_PAGE_ROWS_OPTIONS= [
  5, 10, 12, 15, 25, 50
]

// ⅄
// ☷

const AxustableActions = (
  {pageCurrent, pageCount, pageRows, dataLength, onChangePage, onChangePageRows, 
    filterable, searchable, paginable, hasSomeFilter, onClearFilter, exportable, onExportFile, search, onChangeSearch}) => {
  
  const [showSearch, setShowSearch]= useState(false)

  return (
    <div className="axustable-actions">

      <div className="axustable-actions-left">
    
        {exportable
        ? 
          <div className={`axustable-export`}>
            <a onClick={() => onExportFile()}>
              <Download />
            </a>    
          </div>
          : null}

        {filterable
        ? 
          <div className={`axustable-clear-filter ${hasSomeFilter ? 'active' : ''}`}>
            <a onClick={() => onClearFilter()}>
              {hasSomeFilter
              ? <FilterRemove />
              : <FilterOn  enabled={false}/>}
            </a>    
          </div>
        : null}   

        {searchable
          ? 
          <div className={`axustable-search`}>
            <a onClick={() => setShowSearch(!showSearch)}>
              <Search />
            </a>    
          </div>
          : null}
        {showSearch===true
         ?
          <div className="axustable-search-input">
            <input type="search"
                  value={search}
                  onChange={(ev) => onChangeSearch(ev.target.value)}
                  placeholder="Busca..."/>
          </div>            
         : null}

      </div>


      <div className="axustable-actions-right">
        {paginable
        ? 
          <div className="axustable-pagination">
            
            <div className = {`arrow ${pageCurrent > 1 ? 'active' : 'disabled'}`}
                disabled  = {pageCurrent==1}
                onClick   = {() => onChangePage(pageCurrent-1)} >{"⇐"}</div>
            
            {(pageCurrent-3 <= 0)
              ? <div className="ellipsis">&nbsp;</div>
              : <div className="ellipsis">...</div>
            }

            {(pageCurrent-2 <= 0)
              ? <div className = "page-num">&nbsp;</div>
              : <div className = "page-num"
                  onClick   = {() => onChangePage(pageCurrent-2)} >{pageCurrent-2}</div>
            }

            {(pageCurrent-1 <= 0)
              ? <div className = "page-num">&nbsp;</div>
              : <div className = "page-num"
                  onClick   = {() => onChangePage(pageCurrent-1)} >{pageCurrent-1}</div>
            }      

            <div className  = "page-num active">{pageCurrent}</div>

            {pageCurrent+1 > pageCount
              ? <div className = "page-num">&nbsp;</div>
              : <div className = "page-num"
                  onClick   = {() => onChangePage(pageCurrent+1)} >{pageCurrent+1}</div>
            }

            {pageCurrent+2 > pageCount
              ? <div className = "page-num">&nbsp;</div>
              : <div className = "page-num"
                  onClick   = {() => onChangePage(pageCurrent+2)} >{pageCurrent+2}</div>
            }  
            
            {(pageCurrent+3 > pageCount)
              ? <div className="ellipsis">&nbsp;</div>
              : <div className="ellipsis">...</div>
            }

            <div className = {`arrow ${pageCurrent < pageCount ? 'active' : 'disabled'}`}
                disabled  = {pageCurrent >= pageCount}
                onClick   = {() => onChangePage(pageCurrent+1)} >{"⇒"}</div>
            

            <div className="select">
              <select onChange={(ev) => onChangePageRows(ev.target.value)}
                      value={pageRows}>
                {AXUSTABLE_PAGE_ROWS_OPTIONS.map((v) => 
                  <option key  ={`axustable_page_rows_val_${v}`}
                          value={v}>
                    {v}
                  </option>
                )}
              </select>
            </div>

            <div className="total">
            {`${pageCount} pág, ${dataLength} reg.`}
            </div>
          </div>
        : null}
      </div>
    </div>
  )
}

export default AxustableActions

