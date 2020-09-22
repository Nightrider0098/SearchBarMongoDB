import React, { Component } from 'react'
import About from './About'
import Content from './Contentdb'
import Logs from './Logs'

class DatabaseDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dbName: ""
        }
    }

    render() {
        return (
            <div className='container-fluid '>
                <div className='row pt-2' style={{ 'margin': '20px 0 0 0 ' }}>
                    <div className='col-sm-2' >

                        <div id="list-example" className="list-group">
                            <a className="list-group-item list-group-item-action" href="#list-item-1">About</a>
                            <a className="list-group-item list-group-item-action" href="#list-item-2">Content</a>
                            <a className="list-group-item list-group-item-action" href="#list-item-3">logs</a>
                        </div>
                        <button className='btn btn-light m-b-1' style={{ 'display': 'block', 'margin-bottom': '7px' }}>Query Editor </button>
                    </div>
                    <div className='col-sm-9'>
                        <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">

                            <About dbName={this.state.dbName} />
                            <Content dbName={this.state.dbName} />
                            <Logs dbName={this.state.dbName} />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default DatabaseDetails
