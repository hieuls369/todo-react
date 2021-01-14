import './App.css';
import TodoItem from './component/todo'
import StageChange from './component/stage'
import React, { Component } from 'react';
import plusIcon from './img/plus.svg'
import removeIcon from './img/remove-black.svg'

class App extends Component{

  constructor(){
    super();

    this.inputElement = React.createRef()

    this.state = 
    {
      newItem: '',
      stage: [
        'All',
        'Complete',
        'Progressing'
      ],
      stageSelect: 'All',
      todo:[
        {title: 'Go to bed', content: 'Prepare pillow', isComplete: true },
        {title: 'Go to toilet', content: 'Take paper', isComplete: false },
        {title: 'Go to school', content: 'Bring laptop', isComplete: false }
      ],
      listFilter: [
        {title: 'Go to bed', content: 'Prepare pillow', isComplete: true },
        {title: 'Go to toilet', content: 'Take paper', isComplete: false },
        {title: 'Go to school', content: 'Bring laptop', isComplete: false }
      ]
    };

    this.itemOnClick = this.itemOnClick.bind(this)
    this.onKeyEnter = this.onKeyEnter.bind(this)
    this.onChangeKey = this.onChangeKey.bind(this)
    this.onStageClick = this.onStageClick.bind(this)
    this.filterList = this.filterList.bind(this)
    this.removeText = this.removeText.bind(this)
    this.onItemRemove = this.onItemRemove.bind(this)
  }
  
  componentDidMount(){
    this.inputElement.current.focus()
  }

  //Set complete 
  itemOnClick(item, index){
    return () => {
      const isComplete = item.isComplete;
      const { todo, listFilter } = this.state;
      let todoIndex = todo.findIndex(x => x.title === item.title)
      todo[todoIndex].isComplete = !isComplete
    
      this.setState({
        todo: todo,
        listFilter: [
          ...listFilter.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...listFilter.slice(index + 1)
        ]
      })
    }
  }

  //Add new item
  onKeyEnter(event){
    if(event.keyCode === 13){
      let text = event.target.value
      let { todo, listFilter } = this.state
      // let listRender = listFilter.length === 0 ? todo : listFilter
      let item = {
        title: text,
        isComplete: false
      }
      this.setState({
        newItem: '',
        todo: [
          item,
          ...todo
        ],
        listFilter: [
          item,
          ...listFilter
        ]
        
      })
    }
  }

  //Save input in a state
  onChangeKey(event){
    this.setState({
      newItem: event.target.value
    })
  }

  //Set Stage : All, Complete, Progressing
  onStageClick(item){
    return () => {
      this.setState({
        stageSelect: item,
        listFilter: this.filterList(item)
      })
    }
  }

  //Filter the todo list when change stage
  filterList(stageSelect){
      const { todo } = this.state
      let list = todo.filter((item) => {
        let itemFilter = null
        switch(stageSelect){
            case 'All':
              itemFilter = item
              break;
            case 'Complete':
              itemFilter = item.isComplete
              break;
            case 'Progressing':
              itemFilter = !item.isComplete
              break;
            default:
              break
        }
        return itemFilter
      })

      return list
      
  }

  //Remove text on input
  removeText(){
    this.inputElement.current.value = ''
  }

  //Remove item on the list
  onItemRemove(item, index){
    return() => {
      const { listFilter } = this.state
      this.setState({
        todo: [
          ...listFilter.slice(0, index),
          ...listFilter.slice(index + 1)
        ],
        listFilter: [
          ...listFilter.slice(0, index),
          ...listFilter.slice(index + 1)
        ]
      })
    }
  }

  render(){
    const { newItem, stage, stageSelect, listFilter } = this.state
    let plus = plusIcon
    let remove = removeIcon
    
    return(
      <div className='container'>
        <p>Todos</p>
        <div className="counter">
            {
              stage.length && stage.map((item, index) => 
                <StageChange key={index}
                             item={item}
                             stageSelect={stageSelect}
                             onClick={this.onStageClick(item)} />
              )
            }
        </div>
        <div className='App'>
          
          <div className='add'>
            <div className='add-item'>
              <img alt="Add Item" src={plus} width='32px' height='32px'/>
              <input type="text"
                      value={newItem}
                      placeholder="Add new item"
                      onChange={this.onChangeKey}
                      onKeyUp={this.onKeyEnter}
                      ref={this.inputElement}/>
            </div>
            <img alt='remove' onClick={this.removeText} src={remove} width='32px' height='32px'/>
          </div>
          {
            listFilter.length ? listFilter.map((item, index) => 
            <TodoItem key={index} 
                      item={item}
                      stageSelect={stageSelect}
                      onClick={this.itemOnClick(item, index)}
                      onRemove={this.onItemRemove(item, index)}
                      />) : 'Nothing'
          }
        </div>
      </div>
    )
  }

}

export default App;
