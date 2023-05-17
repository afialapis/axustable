import React from 'react'
import FilterSort from './FilterSort.mjs'
//⊶⊡

const AxustableHeaderField = ({ field,  filterable, is_filtered, is_sorted, onChangeSort, onOpenFilter }) => {

  const fieldClassName= ! field.className
    ? ''
    : `axt-header-field-${field.className}`
  
  const labelClassName = `${is_filtered ? 'active' : ''} ${(filterable && field.value!=undefined) ? 'filterable' : ''}`

  return (
    
    <div className={`axt-header-field ${fieldClassName}`}>
      <div className={`axt-header-field-inner`}>
 


        { ( (field.sortable==false) && (field.filterable==false))
          ? null
          : <div className={`axt-header-field-actions`}>

            <FilterSort width      = {18}
                        filterable = {field.filterable}
                        filtered   = {is_filtered}
                        sortable   = {field.sortable}
                        sorted     = {is_sorted}
                        onClick    = {onOpenFilter}/>

            {/*{field.sortable==false
             ? null
             :
              <a onClick={onChangeSort}
                  className={`${is_sorted!=undefined ? 'active' : ''}`}>
                    {is_sorted===undefined
                      ? "⇳"
                      : is_sorted == 'asc'
                        ? "⇧"
                        : "⇩"
                    }
              </a>
             }
            {field.filterable==false
             ? null
             :            
                <a onClick={onOpenFilter}
                    className={``}>
                    ⊡ 
                </a>
            }*/}

            </div>
        }
     
        <div className={`axt-header-field-label ${labelClassName}`} 
             onClick={onChangeSort}>
          {field.label}
        </div>         
      
      </div>
    </div>
  )
}

export default AxustableHeaderField
