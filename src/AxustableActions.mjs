import React from 'react'
import ExcelFile from './buttons/ExcelFile.mjs'
import FilterOff from './buttons/FilterOff.mjs'
import FilterRemove from './buttons/FilterRemove.mjs'

const AXUSTABLE_PAGE_ROWS_OPTIONS= [
  5, 10, 12, 15, 25, 50
]

// ⅄
// ☷

const AxustableActions = (
  {pageCurrent, pageCount, pageRows, dataLength, onChangePage, onChangePageRows, 
    filterable, searchable, paginable, hasSomeFilter, onClearFilter, exportable, onExportFile, search, onChangeSearch}) =>
  <div className="axustable-actions">

    <div className="axustable-actions-left">
      {filterable
      ? 
        <div className={`axustable-clear-filter ${hasSomeFilter ? 'active' : ''}`}>
          <a onClick={() => onClearFilter()}>
            {hasSomeFilter
             ? <FilterRemove width={16}/>
             : <FilterOff width={16} enabled={false}/>}
          </a>    
        </div>
      : null}      
      {exportable
       ? 
        <div className={`axustable-export`}>
          <a onClick={() => onExportFile()}>
            <ExcelFile width={16}/>
          </a>    
        </div>

       
        : null}
    </div>

    <div className="axustable-actions-middle">
      {searchable 
      ? 
        <div className="axustable-search">
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

export default AxustableActions

