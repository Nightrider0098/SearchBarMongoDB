import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_query: 0, dbName: 'emp2', dbLength: 0, recieved_data: "", progress: 0
        }
        this.StartSearch = this.StartSearch.bind(this)
        this.StartContinue = this.StartContinue.bind(this)
        const { dispatch } = this.props;
        var xhttp = new XMLHttpRequest()
    }

    componentDidMount() {
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                var wholeData = JSON.parse(xhttp.response)
                if (wholeData.id == 1) {
                    dbLength = wholeData.dbLength
                    this.setState({ recieved_data: wholeData.data, progress: 5 })
                    // document.getElementById('progressBar').value = 10
                    StartContinue()
                }
                else if (wholeData.id == 2) {
                    this.setState({ recieved_data: recieved_data + wholeData.data, progress: progress + 5 })
                    document.getElementById('progressBar').value += 10
                    StartContinue()
                }
            }
        }
    }
    StartSearch() {
        xhttp.open('get', '/SearchBig')
        xhttp.send()
    }
    StartContinue() {
        this.setState({ current_query: current_query + 1 })
        if (current_query < 10) {
            var sql_query = 'index=' + current_query + '&dbName=' + dbName + '&dbLength=10400'
            xhttp.open('get', '/SearchBigContinue?' + sql_query)
            xhttp.send()
        }
    }

    render() {
        return (
            <Fragments>
                <label for="file">Downloading progress:</label>
                <progress id="progressBar" value={this.state.progress} max="100"> loadings </progress>
                <div id="data">{this.state.data}</div>
            </Fragments>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };


