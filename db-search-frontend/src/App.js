import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_query: 0, dbName: 'emp2', dbLength: 0, recieved_data: "", progress: 0, status: "Status"
    }
    this.StartSearch = this.StartSearch.bind(this)
    this.StartContinue = this.StartContinue.bind(this)
    // this.componentDidMount = this.componentWillMount.bind(this)
  }

  componentDidMount() {
    this.StartSearch()
  }
  StartSearch() {
    this.setState({ status: "Searching...." })
    fetch('http://localhost:5400/SearchBig').then(res => {
      return res.json()
    }).then(wholeData => {
      this.setState({ dbLength: wholeData.dbLength, recieved_data: wholeData.data, progress: wholeData.progress })
      this.StartContinue()
    })

  }

  StartContinue() {
    this.setState({ current_query: this.state.current_query + 1 })
    var sql_query = 'index=' + this.state.current_query + '&dbName=' + this.state.dbName + '&dbLength=10400'
    if (this.state.progress < 100) {
      fetch('http://localhost:5400/SearchBigContinue?' + sql_query).then(res => { return res.json() }).then(wholeData => {
        Array.prototype.push.apply(wholeData.data, this.state.recieved_data);
        this.setState({ recieved_data: wholeData.data, progress: wholeData.progress })
        this.StartContinue()

      })
    }
    else {
      this.setState({ status: "Search Completed!!" })
    }
  }

  render() {
    return (
      <div>
        <div id="LabelHolder">
          <label >{this.state.status}</label>
        </div>
        <div id="ProgressHolder">
          <progress id="progressBar" value={this.state.progress} max="100"> loadings </progress>
        </div>
        <div id="data">{JSON.stringify(this.state.recieved_data)}</div>
      </div >
    );
  }
}

export default App;


