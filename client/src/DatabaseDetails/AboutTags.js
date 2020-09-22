import React, { Component } from 'react'

class Tags extends Component {
    render() {
        return (
            <div className='badge badge-info d-inline m-1'>{this.props.tag}</div>
        )
    }
}

export default Tags
