import React, { Component } from 'react'

class Logs extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }



    componentDidMount() {
        fetch('/api/FetchLogs?dbName=' + this.props.dbName).then(res => { return res.json() }).then(res => {
            this.setState({...res['data']})
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className='container' id='list-item-3'>
                <div className="panel panel-default">
                    <div className="panel-heading"><strong>Logs</strong></div>
                    <div className="panel-body">

                        <table class="table table-condensed">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Columns</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Usage</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>buenpath</td>
                                    <td>string</td>
                                    <td>11%</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Logs
