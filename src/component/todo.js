import React, { Component } from 'react'
import classNames from 'classnames'
import checkDone from '../img/check-done.svg'
import checkUndone from  '../img/check-undone.svg'
import remove from '../img/remove.svg'

class Todo extends Component {

    render() {
        const { item, onClick } = this.props
        let url = item.isComplete ? checkDone : checkUndone
        let extraClass = classNames({
            'Todo-extra': true
        })
        let hoverText = classNames({
            'hover-text': true
        })
        let textClass = classNames({
            'Todo': true,
            'Todo-complete': item.isComplete
        })
        return (
            <div className={extraClass}>
                <div className={textClass}>
                    <img alt='check' onClick={onClick} src={url} width='32px' height='32px'/>
                    <p>{item.title}</p>
                </div>
                <img alt='remove' className={hoverText} src={remove} width='32px' height='32px'/>
            </div>
        )
    }
}

export default Todo