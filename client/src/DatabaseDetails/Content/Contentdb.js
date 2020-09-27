import React, { Component } from 'react'
import PlotGraph from './UpdateTrackGraph'
import ContentGraph from './PartitionGraph'
class Content extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dName: this.props.dName,
            Alert: 'This table is not valid There are a lot of problme here can we correct it using some new features it would really help me this is a humble advice',
            AlertHeading: "SiteOver Flow here",
            rows: { 'Total': "0 ", "Latest": '0 ' },
            size: { 'Total': "0 ", "Latest": '0 ' },
            updatelist: { data: [0, 1, 2, 3], labels: [0, 1, 2, 3] },
            partition: [{ 'size': 0, 'row_count': 0 }]
        }
    }


    componentDidMount() {
        fetch('/api/FetchContent?dName=' + this.props.dName + '&tName=' + encodeURI(this.props.tName)).then(res => { return res.json() }).then(res => {
            if (res['type'] === 'sucess')
                this.setState({ size: res['data']['size'], rows: res['data']['rows'], updatelist: res['data']['tableReport']['updateSizeList'] })

        }).catch(err => {
            console.log(err)
        })

        fetch('/api/partitionDetails?dName=' + this.props.dName).then(res => { return res.json() }).then(res => {
            if (res['type'] === 'sucessful')
                this.setState({ partition: res['response'] })

        }).catch(err => {
            console.log(err)
        })
    }
    partitionAverageRows(partition) {

        var avg = 0;
        for (var i = 0; i < partition.length; i++) {
            avg += partition[i]['row_count']
        }
        console.log(avg / partition.length)
        return avg / partition.length

    }
    partitionAverageSize(partition) {

        var avg = 0;
        for (var i = 0; i < partition.length; i++) {
            avg += partition[i]['size']
        }
        return avg / partition.length

    }
    componentDidUpdate() {
        console.log(this.state)
    } render() {
        return (
            <div className='container' id='list-item-2'>
                <div className="panel panel-default">
                    <div className="panel-heading"><strong>Content</strong></div>
                    <div className="panel-body">
                        <div className='row'>
                            <div className='col-sm-3'>
                                <p class="text-secondary"><strong> Partitions Details</strong></p>
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td className='text-secondary'>Total Partitions</td>
                                            <td >{this.state.partition.length}</td>
                                        </tr>

                                        <tr>
                                            <td className='text-secondary'>Average Rows</td>
                                            <td >{this.partitionAverageRows(this.state.partition)}</td>
                                        </tr>

                                        <tr>
                                            <td className='text-secondary'>Average Size</td>
                                            <td >{this.partitionAverageSize(this.state.partition)} MB</td>
                                        </tr>



                                    </tbody>
                                </table>
                            </div>

                            <div className='col-sm-3'>
                                <p class="text-secondary"><strong>Partitions Distribution</strong></p>
                                <ContentGraph data={this.state.partition} />
                            </div>

                            <div className='col-sm-3'>
                                <p class="text-secondary"><strong> Rows  </strong></p>
                                <table class="table ">
                                    <tbody>
                                        <tr>
                                            <td className='text-secondary'>Total</td>
                                            <td >{(this.state.rows.Latest)} </td>
                                        </tr>

                                        <tr>
                                            <td className='text-secondary'>Latest</td>
                                            <td >
                                                {Math.round((this.state.rows.Latest) / 5)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                            <div className='col-sm-3'>
                                <p class="text-secondary"><strong> Size[?]  </strong></p>
                                <table class="table ">
                                    <tbody>
                                        <tr>
                                            <td className='text-secondary'>Total</td>
                                            <td >{this.state.size.Latest} GB</td>
                                        </tr>

                                        <tr>
                                            <td className='text-secondary'>Latest</td>
                                            <td >{Math.round(this.state.size.Latest / 5)}  GB</td>
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
