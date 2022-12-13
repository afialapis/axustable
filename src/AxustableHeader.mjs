import React from 'react'
import {uvl} from 'farrapa-commons'

const AxustableHeaderField = ({ field,  filterable, is_filtered, sortable, is_sorted, onChangeSort, onOpenFilter }) => {

  const fieldClassName= uvl(field.className,'').length>0 
        ? 'axustable-header-field-'+uvl(field.className,'') 
        : ''

  return (
    
    <div className={`axustable-header-field ${fieldClassName}`}>
      <div className={`axustable-header-field-inner`}>
        <div className={`axustable-header-field-label ${is_filtered ? 'active' : ''} ${(filterable && field.value!=undefined) ? 'filterable' : ''}`} 
              onClick={onOpenFilter}>
          {field.label}
        </div>  

        { (field.value==undefined || !sortable)
          ? null
          : <div className={`axustable-header-field-actions`}>
              <a onClick={onChangeSort}
                  className={`${is_sorted!=undefined ? 'active' : ''}`}>
                    {is_sorted===undefined
                      ? "⇳"
                      : is_sorted == 'asc'
                        ? "⇧"
                        : "⇩"
                    }
              </a>
            </div>
        }
      
      </div>
    </div>
  )
}




const AxustableHeader = ({ fields, sort, sortable, filterable, filteredIndexes, onChangeSort, onOpenFilter }) =>
  <div className="axustable-header">
    {fields.map((f, i) => 
      <AxustableHeaderField
        key        = {`axustable_field_${i}`}
        field      = {f}
        filterable = {filterable}
        is_filtered= {filteredIndexes.indexOf(i)>=0}
        sortable   = {sortable}
        is_sorted  = {sort===undefined
                      ? undefined 
                      : i!=sort[0]
                        ? undefined
                        : sort[1]
                     }
        onChangeSort= {() => onChangeSort(i)}
        onOpenFilter= {() => onOpenFilter(i)}/>
    )}
  </div>

export default AxustableHeader


/*


      <div key={i}
           className={`axustable-header-field ${uvl(f.className,'').length>0 ? 'axustable-header-field-'+uvl(f.className,'') : ''}`}>
        <div className={`axustable-header-field-inner`}>
          <div className={`axustable-header-field-label ${filteredIndexes.indexOf(i)>=0 ? 'active' : ''} ${(filterable && f.value!=undefined) ? 'filterable' : ''}`} 
               onClick={() => onOpenFilter(i)}>
            {f.label}
          </div>  

         {f.value==undefined || !sortable
          ? null
          : <div className={`axustable-header-field-actions`}>
              <a onClick={() => onChangeSort(i)}
                  className={`${sort!=undefined && i==sort[0] ? 'active' : ''}`}>
                    {sort===undefined || i!=sort[0] 
                      ? "⇳"
                      : sort[1] == 'asc'
                        ? "⇧"
                        : "⇩"
                      }
              </a>
            </div>
            }
        
        </div>
      </div>

      */