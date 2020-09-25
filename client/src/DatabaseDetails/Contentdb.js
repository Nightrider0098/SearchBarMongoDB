import React, { Component } from 'react'
import PlotGraph from '../PlotGraph/plotGraph'
class Content extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dbName: this.props.dbName,
            Alert: 'This table is not valid There are a lot of problme here can we correct it using some new features it would really help me this is a humble advice',
            AlertHeading: "SiteOver Flow here",
            rows: { 'Total': "0 ", "Latest": '0 ' },
            size: { 'Total': "0 ", "Latest": '0 ' },
            updatelist: { data: [0, 1, 2, 3], labels: [0, 1, 2, 3] }
        }
    }


    componentDidMount() {
        fetch('/api/FetchContent?dbName=' + this.props.dbName).then(res => { return res.json() }).then(res => {
            if (res['type'] === 'sucess')
                this.setState({ size: res['data']['size'], rows: res['data']['rows'], updatelist: res['data']['TableReport']['UpdateSizeList'] })

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
                                            <td >
                                                {(this.state.rows.Latest)} MB
                                            </td>
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
                                            <td >{this.state.size.Total} GB</td>
                                        </tr>

                                        <tr>
                                            <td className='text-secondary'>Latest</td>
                                            <td >{this.state.size.Latest}  GB</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div>
                            <strong>DS Partition Sizes</strong>
                            <div>
                                <div>
                                   <PlotGraph labels={this.state.updatelist['labels']} data={this.state.updatelist.data} />
                                </div>


                            </div>
                        </div>
                        </div>
                </div >
            </div >
        )

    }
}

export default Content
