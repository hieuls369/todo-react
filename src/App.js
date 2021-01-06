import './App.css';
import TodoItem from './component/todo'
import StageChange from './component/stage'
import { Component } from 'react';
import plusIcon from './img/plus.svg'

class App extends Component{

  constructor(){
    super();
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
        {title: 'Go to bed', content: 'Prepare pillow', isComplete: true, },
        {title: 'Go to toilet', content: 'Take paper', isComplete: false, },
        {title: 'Go to school', content: 'Bring laptop', isComplete: false, }
      ],
      listFilter: []
    };

    this.itemOnClick = this.itemOnClick.bind(this)
    this.onKeyEnter = this.onKeyEnter.bind(this)
    this.onChangeKey = this.onChangeKey.bind(this)
    this.onStageClick = this.onStageClick.bind(this)
    this.filterList = this.filterList.bind(this)
    // this.itemMouse = this.itemMouse.bind(this)
        
  }
  //Set complete taskthis.filterList(stageSelect)
  itemOnClick(item, index){
    return () => {
      const isComplete = item.isComplete;
      const { todo } = this.state;
      
      this.setState({
        todo: [
          ...todo.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todo.slice(index + 1)
        ]
      })
    }
  }

  //Add new item
  onKeyEnter(event){
    if(event.keyCode === 13){
      let text = event.target.value
      let { todo } = this.state
      let item = {
        title: text,
        isComplete: false
      }
      this.setState({
        newItem: '',
        todo: [
          item,
          ...todo
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
        stageSelect: item
      })
    }
  }

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

      console.log(list)
     
  }

  // itemMouse(item, index){
  //   return () => {
  //     const isHover = item.isHover;
  //     const { todo } = this.state;
      
  //     this.setState({
  //       todo: [
  //         ...todo.slice(0, index),
  //         {
  //           ...item,
  //           isHover: !isHover
  //         },
  //         ...todo.slice(index + 1)
  //       ]
  //     })
  //   }
  // }

  render(){
    const { todo, newItem, stage, stageSelect } = this.state
    let plus = plusIcon
    // this.filterList(stageSelect)
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
          
          <div className='add-item'>
            <img alt="Add Item" src={plus} width='32px' height='32px'/>
            <input type="text"
                    value={newItem}
                    placeholder="Add new item"
                    onChange={this.onChangeKey}
                    onKeyUp={this.onKeyEnter}/>
          </div>
          {
            todo.length && todo.map((item, index) => 
            <TodoItem key={index} 
                      item={item}
                      stageSelect={stageSelect}
                      onClick={this.itemOnClick(item, index)}
                      />)
          }
        </div>
      </div>
    )
  }

}

export default App;
