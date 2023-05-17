import React from 'react'
import ArrowLeft from './ArrowLeft.mjs'
import ArrowRight from './ArrowRight.mjs'


const AXUSTABLE_PAGE_ROWS_OPTIONS= [
  5, 10, 12, 15, 25, 50
]

const Pagination = ({paginable, rowCount, currentPage, pageCount, onChangePage, pageRows, onChangePageRows}) => {
  if (!paginable) {
    return null
  }
  
  return (
    <div className="axt-toolbar-pagination">
      <ArrowLeft disabled={currentPage <= 1}
                onClick={() => onChangePage(currentPage-1)}/>


      {(currentPage-3 <= 0)
        ? <div className="axt-toolbar-pagination-page empty">&nbsp;</div>
        : <div className="axt-toolbar-pagination-page ellipsis">...</div>
      }

      {(currentPage-2 <= 0)
        ? <div className = "axt-toolbar-pagination-page epmty">&nbsp;</div>
        : <div className = "axt-toolbar-pagination-page page-num"
            onClick   = {() => onChangePage(currentPage-2)} >{currentPage-2}</div>
      }

      {(currentPage-1 <= 0)
        ? <div className = "axt-toolbar-pagination-page empty">&nbsp;</div>
        : <div className = "axt-toolbar-pagination-page page-num"
            onClick   = {() => onChangePage(currentPage-1)} >{currentPage-1}</div>
      }      

      <div className  = "axt-toolbar-pagination-page page-num active">{currentPage}</div>

      {(currentPage+1 > pageCount)
        ? <div className = "axt-toolbar-pagination-page empty">&nbsp;</div>
        : <div className = "axt-toolbar-pagination-page page-num"
            onClick   = {() => onChangePage(currentPage+1)} >{currentPage+1}</div>
      }

      { (currentPage+2 > pageCount)
        ? <div className = "axt-toolbar-pagination-page empty">&nbsp;</div>
        : <div className = "axt-toolbar-pagination-page page-num"
            onClick   = {() => onChangePage(currentPage+2)} >{currentPage+2}</div>
      }  
      
      {(currentPage+3 > pageCount)
        ? <div className="axt-toolbar-pagination-page empty">&nbsp;</div>
        : <div className="axt-toolbar-pagination-page ellipsis">...</div>
      }

      <ArrowRight disabled={currentPage >= pageCount}
                  onClick={() => onChangePage(currentPage+1)}/>



      <div className="axt-toolbar-pagination-select">
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

      <div className="axt-toolbar-pagination-total">
      {`${pageCount} pág, ${rowCount} reg.`}
      </div>

    </div>
  )
}

export default Pagination