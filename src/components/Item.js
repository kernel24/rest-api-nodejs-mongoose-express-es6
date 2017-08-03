import React, {Component} from 'react'

class Item extends React.Component {

  constructor(){
      super(...arguments)
      this.updateValue = this.updateValue.bind(this)
      this.displayIcon = this.displayIcon.bind(this)
      this.checkValue = this.checkValue.bind(this)

      this.state = {"value":undefined}
  }

  updateValue(event){
      console.log("Item: "+event.target.name+" "+event.target.value)
      this.setState({"value":event.target.value})
      this.props.onUpdate(event)
  }

  checkValue(val1, val2){
       return val1 === val2
  }

  displayIcon(icon) {
    if(icon) return (<i className='material-icons md-dark'>{icon}</i>)
  }

  makeInputElements() {
    let item = Object.assign([], this.props.items);
    let type = item.type;
    let options = item.options;
    let itemName = item.name;

    switch (type) {
      case 'select':
        return (
          <select className="browser-default" name={itemName} value={this.state.value?this.state.value:this.props.selectedItem} onChange={this.updateValue}>
            {options.map((option, index) =>
                <option key={option.name + index} value={option.value} >{option.name}</option>)}
          </select>
        )
        break;
      case 'radio':
        return (
          <div className="row">
          {options.map((option, index) => (
            <div key={option.name + index} className="col s4">
              <input className="with-gap" name={itemName} type="radio" id={ itemName + index } value={option.value} checked={this.checkValue(this.state.value?this.state.value:this.props.selectedItem,option.value)} onChange={this.updateValue} />
              <label htmlFor={ itemName + index } className="content-font-radio"> {this.displayIcon(option.icon)} {option.name}</label>
            </div>
          ))}
          </div>
        )
        break;
    }
  }

  render() {
    return (
         this.makeInputElements()
    )
  }
}

export default Item
