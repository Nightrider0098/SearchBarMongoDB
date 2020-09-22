import React, { Component } from 'react'
// import tag
class About extends Component {
    constructor(props) {
        super(props)

        this.state = {
           
            Description: "...",
            tags: ['...'],
            Owner: '...',
            Oncall: '...)',
            createdAt: '...',
            LastModified: '...',
            dataQuality: "...",
            Alert: 'This Table is Bit too long for your Screen to Display whatever is inside it.'
        }
    }


    componentDidMount() {
        fetch('/api/FetchAbout?dbName=' + this.props.dbName,).then(response => response.json()).then(data => {
            console.log(data)
            this.setState({ ...data['data'] })
        }).catch(err => {
            alert("error before parsing" + err)
        })

    }
    render() {
        return (
            <div className='container' id='list-item-1'>
                <div className="panel panel-default">
                    <div className="panel-heading"><strong>About</strong></div>
                    <div className="panel-body">
                        <div className="alert alert-warning">{this.state.Alert}</div>
                        <div className="form-group">
                            <label for="usr">Description:</label>
                            <input type="text" value={this.state.Description} className="form-control" id="discription" />
                        </div>
                        <div className="form-group">
                            <label for="pwd">Tags:</label>
                            <input type="password" className="form-control" id="tags" />
                        </div>
                        <div className='row'>
                            <div className='col-sm-2'>
                                Owner
                            </div>
                            <div className='col-sm-10'>
                                <div className='alert alert-info d-inline' style={{ 'width': '20%', 'margin-top': '5px', 'display': 'inline' }}>{this.state.Owner}</div>
                                <div className='badge badge-info d-inline m-1'>{this.state.tags[0]}</div>
                                {/* </div> */}
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-sm-2'>Oncall</div>
                            <div className='col-sm-10'>
                                <div className='alert alert-success'>{this.state.Oncall}</div>
                            </div>
                        </div>


                        <div className='row'>
                            <div className='col-sm-2'>Created At</div>
                            <div className='col-sm-10'>
                                {this.state.createdAt}
                            </div>
                        </div>


                        <div className='row'>
                            <div className='col-sm-2'>Last Modified</div>
                            <div className='col-sm-10'>
                                {this.state.LastModified}
                            </div>
                        </div>


                        <div className='row'>
                            <div className='col-sm-2'>Date Quality</div>
                            <div className='col-sm-10'>
                                {this.state.dataQuality}
                            </div>
                        </div>

                    </div>
                </div>
            </div>)
    }
}

export default About
