import React, {useState, useEffect} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, InputGroup, FormGroup, InputGroupText } from 'reactstrap'

const AxustableFilterModal = ({title, show, filterData, onClose, onSubmit}) => {
  const [values, setValues]= useState(filterData)
  const [searchText, setSearchText]= useState('')

  useEffect(() => {
    setSearchText('')
  }, [show])

  useEffect(() => {
    setValues(filterData)
  }, [filterData])

  const toggleValue = (idx) => {
    const nValues= [...values]
    nValues[idx][1]= ! nValues[idx][1]
    setValues(nValues)
  }

  const toggleAll = (to) => {
    const nValues= [...values]
    nValues.map((v) => v[1]=to)
    
    setValues(nValues)    
  }

  return (
    <div >
      <Modal  isOpen             = {show} 
              toggle             = {(e) => onClose(e)} 
              backdrop           = {true}
              modalTransition    = {{ timeout: 20 }}
              backdropTransition = {{ timeout: 10 }}
              className="axt-filter-modal">
        <ModalHeader 
              toggle             = {(e) => onClose(e)}>
          <div>{title}</div>
          <div className="axt-filter-search">
            <InputGroup>
              <Input type="text" 
                     value={searchText}
                     onChange={(ev) => setSearchText(ev.target.value)}/>
              <InputGroupText>
              {"☌"}
              </InputGroupText>
            </InputGroup>
            
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="axt-filter-list">
            {values.map((v, i) => {
                if ((searchText && v[0]) ? v[0].toLowerCase().indexOf(searchText.toLowerCase())>=0 : true) {
                  return (
                    <div key      ={`axt-filter-val-${i}`}
                        className={`axt-filter-val ${v[1] ? 'active' : 'inactive'}`}
                        /*onClick  = {() => toggleValue(i)}*/>
                      <FormGroup size="sm" check>
                        <Input type="checkbox" id={`axt-filter-val-${i}-check`} 
                               checked={v[1]}
                               onChange={() => {}}
                               onClick={() => toggleValue(i)}/> 
                        <Label>
                          {v[0]!=undefined ? v[0].toString() : ''} 
                        </Label>
                      </FormGroup>
                    </div>
                  )
                }
              }
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <FormGroup check>
            <Input type="checkbox"
                        id={`axt-filter-sall-check`} 
                        defaultChecked={true}
                        onClick={(ev) => toggleAll(ev.target.checked)}/> 
            <Label>
              <i>Seleccionar todos</i>
            </Label>
          </FormGroup>
          <div>
            <button onClick={() => onClose()}>Cancelar</button>
            <button onClick={() => onSubmit(values)}>Filtrar</button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  )
  
}
export default AxustableFilterModal
