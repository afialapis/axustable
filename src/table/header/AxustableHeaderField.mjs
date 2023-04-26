import React from 'react'

//⊶⊡

const AxustableHeaderField = ({ field,  filterable, is_filtered, is_sorted, onChangeSort, onOpenFilter }) => {

  const fieldClassName= ! field.className
    ? ''
    : `axustable-header-field-${field.className}`
  
  const labelClassName = `${is_filtered ? 'active' : ''} ${(filterable && field.value!=undefined) ? 'filterable' : ''}`

  return (
    
    <div className={`axustable-header-field ${fieldClassName}`}>
      <div className={`axustable-header-field-inner`}>
 


        { ( (field.sortable==false) && (field.filterable==false))
          ? null
          : <div className={`axustable-header-field-actions`}>
            {field.sortable==false
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
            }

            </div>
        }
     
        <div className={`axustable-header-field-label ${labelClassName}`} 
             onClick={onChangeSort}>
          {field.label}
        </div>         
      
      </div>
    </div>
  )
}

export default AxustableHeaderField
