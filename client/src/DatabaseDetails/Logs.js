import React, { Component } from 'react'

class Logs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            colDetails: []
        }
    }



    componentDidMount() {
        fetch('/api/FetchLogs?dbName=' + this.props.dbName + "&tName=" + encodeURI(this.props.tName) + "&dbType=" + encodeURIComponent(this.props.dbType)).then(response => { return response.json() }).then(response => {
            if (response['type'] === 'sucess') {
                this.setState({ colDetails: JSON.parse(response['colDetails']) });
            }
            else if (response['type'] === 'error') alert(response['message'])
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidUpdate(preProps, preState) {
        if (preProps.dbType !== this.props.dbType)
            fetch('/api/FetchLogs?dbName=' + this.props.dbName + "&tName=" + encodeURI(this.props.tName) + "&dbType=" + encodeURIComponent(this.props.dbType)).then(response => { return response.json() }).then(response => {
                if (response['type'] === 'sucess') {
                    this.setState({ colDetails: JSON.parse(response['colDetails']) });
                }
                else if (response['type'] === 'error') alert(response['message'])
            }).catch(err => {
                console.log(err)
            })
    }


    buildRows(Data) {
        var data = Data
        if (typeof (Data) == String)
            data = JSON.parse(Data)
        if (data === []) {
            return (<tr>
                <th scope="row">1</th>
                <td>Data Is been fetched</td>
                <td>...</td>
                <td>...</td>
            </tr>)
        }
        else {
            var retData = []
            for (var i = 0; i < data.length; i++) {
                retData.push(<tr>
                    <th scope="row">{i + 1}</th>
                    <td>{(data[i]["name"])}</td>
                    <td>{(data[i]["type"])}</td>
                    <td>{(data[i]["Fill"] * 100)}%</td>
                </tr>)

            }
            return retData

        }
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
                                {
                                    this.buildRows(this.state.colDetails)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Logs
