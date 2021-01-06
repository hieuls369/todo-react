import React, { Component } from 'react'
import classNames from 'classnames'

class StageChange extends Component{
    render(){
        const { item, onClick, stageSelect } = this.props
        let stageClass = classNames({
            'stage': true,
            'stage-select': item === stageSelect
        })
        return (
            <div className={stageClass} onClick={onClick}>{item}</div>
        )
    }
}

export default StageChange