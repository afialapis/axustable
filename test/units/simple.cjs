const React = require('react')
const expect= global.expect
const mount= global.mount

describe('Axustable Simple', function () {
  //this.timeout(15000)

  it("should render an axustable table", () => {   
    this.timeout(15000)
    const {Axustable} = global.axustablePkg
    
    const App = () => {
      return (
        <div>
          <Axustable data={[]} fields = {[]}/>
        </div>
      )
    }

    const wrapper= mount(<App/>)
    const theTable= wrapper.find(`div.axustable`)
    const theTableNode= theTable.getDOMNode()

    expect(theTable.length).to.equal(1)
    expect(theTableNode.classList.contains('axustable')).to.equal(true)

    wrapper.unmount()
  })  
})