import React, { Component } from 'react'
import About from './About/About'
import Content from './Content/Contentdb'
import Logs from './Logs'

class DatabaseDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dbName: "githubdatabase",
            tName: "emp",
            dbType: 'mysql'
        }

        this.stateHandler = this.stateHandler.bind(this)
    }

    stateHandler() {
        if (this.state.dbType === "mysql")
            this.setState({
                dbName: "oexslycq",
                tName: "turtle_life_table",
                dbType: 'pg'
            },alert('changed from mysql'))
        else {
            this.setState({
                dbName: "githubdatabase",
                tName: "emp",
                dbType: 'mysql'
            },alert('changed from pg'))

        }}
        render() {
            return (
                <div className='container-fluid '>
                    <div className='row pt-2' style={{ 'margin': '20px 0 0 0 ' }}>
                        <div className='col-sm-2' >

                            <div id="list-example" className="list-group">
                                <a className="list-group-item list-group-item-action active" href="#list-item-1">About</a>
                                <a className="list-group-item list-group-item-action" href="#list-item-2">Content</a>
                                <a className="list-group-item list-group-item-action" href="#list-item-3">logs</a>
                            </div>
                            <button className='btn btn-light m-b-1' style={{ 'display': 'block', 'margin-bottom': '7px' }}>Query Editor </button>
                            <button className='btn btn-light m-b-1'  onClick={this.stateHandler} style={{ 'display': 'block', 'margin-bottom': '7px' }}>Switch Db </button>
                        </div>
                        <div className='col-sm-9'>
                            <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">

                                <About dbName={this.state.dbName} tName={this.state.tName} dbType={this.state.dbType} />
                                <Content dbName={this.state.dbName} tName={this.state.tName} dbType={this.state.dbType} />
                                <Logs dbName={this.state.dbName} tName={this.state.tName} dbType={this.state.dbType} />
                            </div>
                        </div>
                    </div>
                </div >
            )
        }
    }

    export default DatabaseDetails
