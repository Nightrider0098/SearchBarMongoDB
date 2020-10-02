import React, { Component } from 'react'

class AboutDescription extends Component {
    constructor(props) {
        super(props)

        this.state = {
            description: "Loading Description....",
            descUpdating: 0
        }
        this.descLoadingHanlder = this.descLoadingHanlder.bind(this)
        this.descriptionHandler = this.descriptionHandler.bind(this)
        this.inputHandler = this.inputHandler.bind(this)
    }

    componentDidMount() {
        fetch('/api/tableDescription?dbName=' + encodeURI(this.props.dbName) + "&tName=" + encodeURI(this.props.tName)+"&dbType="+encodeURIComponent(this.props.dbType)).then(response => response.json()).then(data => {
            if (data['type'] === 'sucess')
                this.setState({ description: data['data']['description'] })
        }).catch(err => {
            alert("error before parsing" + err)
        })
    }
    descriptionHandler(event) {
        if (event.charCode === 13) {
            this.setState({ descUpdating: 1 })
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tName: this.props.tName,
                    dbType: this.props.dbType,
                    dbName: this.props.dbName,
                    updatedDescription: event.target.value
                })
            }
            fetch('/api/updateDescription', options).then(ret => { return ret.json() }).then(ret => {
                if (ret['type'] === 'sucessful') {
                    this.setState({ descUpdating: 0 })
                }
            })
        }
    }
    inputHandler(event) {
        this.setState({ description: event.target.value })
    }
    descLoadingHanlder() {
        if (this.state.descUpdating === 1) {
            return <i className="fa-2x fas fa-cog fa-spin"></i>
        }
        else { return <i class="fa-2x fas fa-clipboard"></i> }
    }

    render() {
        return (
            <div className="form-group">
                <label for="discription">Description:</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            {this.descLoadingHanlder()}
                        </div>
                        <input className="form-control tag-inline" onChange={this.inputHandler} value={this.state.description} placeholder="No description Could Be found" onKeyPress={this.descriptionHandler} id="discription" />
                    </div>
                </div>
            </div>

        )
    }
}

export default AboutDescription
