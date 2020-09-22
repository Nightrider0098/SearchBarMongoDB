import React, { Component } from 'react'

class Content extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dbName: this.props.dbName,
            Alert: 'This table is not valid There are a lot of problme here can we correct it using some new features it would really help me this is a humble advice',
            AlertHeading: "SiteOver Flow here"
        }
    }


    componentDidMount() {
        fetch('/api/FetchContent?dbName=' + this.props.dbName).then(res => { return res.json() }).then(res => {
            this.setState(res)
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div className='container' id='list-item-2'>
                <div className="panel panel-default">
                    <div className="panel-heading"><strong>Content</strong></div>
                    <div className="panel-body">
                        <div className="alert alert-warning alert-secondary ">
                            <h5> {this.state.AlertHeading}</h5>
                            {this.state.Alert}
                        </div>
                        <div className='row'>
                            <div className='col-sm-3'>
                                <p class="text-secondary"><strong> Data Partitions </strong></p>
                                <table class="table table-dark">
                                    <tbody>
                                        <tr>
                                            <td className='text-secondary'>Start</td>
                                            <td >2002-02-05</td>
                                        </tr>

                                        <tr>
                                            <td className='text-secondary'>End</td>
                                            <td >2002-08-05</td>
                                        </tr>

                                        <tr>
                                            <td className='text-secondary'>Total</td>
                                            <td ><strong>0</strong></td>
                                        </tr>

                                        <tr>
                                            <td className='text-secondary'>Missing[?]</td>
                                            <td ><strong>0</strong></td>
                                        </tr>

                                        <tr>
                                            <td className='text-secondary'>Empty[?]</td>
                                            <td ><strong>0</strong></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                            <div className='col-sm-3'>
                                <p class="text-secondary"><strong> Other Partitions </strong></p>
                                <table class="table table-dark">
                                    <tbody>
                                        <tr>
                                            <td className='text-secondary'><strong>None</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='col-sm-3'>
                                <p class="text-secondary"><strong> Rows  </strong></p>
                                <table class="table table-dark">
                                    <tbody>
                                        <tr>
                                            <td className='text-secondary'>Total</td>
                                            <td >Row count Missing</td>
                                        </tr>

                                        <tr>
                                            <td className='text-secondary'>Latest</td>
                                            <td >1,210,161,857</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                            <div className='col-sm-3'>
                                <p class="text-secondary"><strong> Size[?]  </strong></p>
                                <table class="table table-dark">
                                    <tbody>
                                        <tr>
                                            <td className='text-secondary'>Total</td>
                                            <td >559 GB</td>
                                        </tr>

                                        <tr>
                                            <td className='text-secondary'>Latest</td>
                                            <td >9 GB</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div>
                            <strong>DS Partition Sizes</strong>
                            <div>Charts</div>
                        </div>
                        <div>
                            <strong>Sub Partition Sizes</strong>
                            <table class="table table-dark">
                                <thead>
                                    <tr>
                                        <th>ds</th>
                                        <th>Num Rows</th>
                                        <th>Raw Sizes</th>
                                        <th>Total Sizes</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    <tr>
                                        <td className='text-secondary'>2020-05-03</td>
                                        <td>1,210,512,145</td>
                                        <td>599 GB</td>
                                        <td> 9.12 GB </td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div >
            </div >
        )

    }
}

export default Content
