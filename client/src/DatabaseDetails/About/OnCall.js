import React, { Component } from 'react'
import './Tag.css'
export class OnCall extends Component {
    constructor(props) {
        super(props)

        this.state = {
            onCallList: ['...'],
            onCallInput: ""
        }
        this.loadingIcon = this.loadingIcon.bind(this)
        this.NewOnCallHandler = this.NewOnCallHandler.bind(this)
        this.submitOnCall = this.submitOnCall.bind(this)
        this.removeOnCall = this.removeOnCall.bind(this)
    }
    componentDidMount() {
        fetch('/api/tableOnCall?dName=' + encodeURI(this.props.dName) + "&tName=" + encodeURI(this.props.tName)).then(res => { return res.json() }).then(res => {
            if (res['type'] === 'sucess') {
                this.setState({ onCallList: res['data']['onCallList'] })
            }
        }).catch(err => {
            // alert(err)
            console.log('failed to fetch tag details')
        })
    }
    submitOnCall(event) {
        if (event.charCode === 13) {
            var onCallList = this.state.onCallList
            onCallList.push(event.target.value)
            this.setState({ onCallUpdating: 1 })
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tableId: this.props.tableId || 'T001',
                    updatedOnCall: onCallList
                })
            }
            fetch('/api/updateOnCall', options).then(ret => { return ret.json() }).then(ret => {
                if (ret['type'] === 'sucessful') {
                    this.setState({ onCallUpdating: 0 })
                }

            })
        }
    }
    NewOnCallHandler(event) {
        this.setState({ onCallInput: event.target.value })
    }
    loadingIcon() {
        if (this.state.onCallUpdating === 1) {
            return <i className="fa-2x fas fa-cog fa-spin"></i>
        }
        else { return <i class="fa-2x fas fa-users-cog"></i> }
    }
    removeOnCall(person) {
        var t1 = this.state.onCallList;
        t1 = t1.filter(function (e) { return e !== person })

        this.setState({ onCallList: t1 })
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tableId: this.props.tableId || 'T001',
                updatedOnCall: t1
            })
        }
        fetch('/api/updateOnCall', options).then(ret => { return ret.json() }).then(ret => {
            if (ret['type'] === 'sucessful') {
                this.setState({ onCallUpdating: 0 })
            }
        })
    }
    buildOnCall(tList) {
        var ret = []
        for (var i = 0; i < tList.length; i++) {
            const n = i;
            ret.push(

                <span className="tag pill-input">
                    <input type="text" size="1" value={tList[i]} disabled={true} />
                    <i className="delete" onClick={() => { this.removeOnCall(tList[n]) }}  >&times;</i>
                </span>

                // <div class="alert alert-warning alert-dismissible fade show col-2 m-1" role="alert">
                //     {tList[n]}
                //     <button type="button" onClick={() => this.removeOnCall(tList[n])} class="close"  aria-label="Close">
                //         <span aria-hidden="true">&times;</span>
                //     </button>
                // </div>
            )
        }
        return ret;
    }
    render() {
        return (
            <div className="form-group">
                <label>onCall</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            {this.loadingIcon()}
                        </div>
                        <div className="input-group-text bg-white" >
                            {this.buildOnCall(this.state.onCallList)}
                        </div>

                        <input className="form-control tag-inline" onChange={this.NewOnCallHandler} value={this.state.newOnCall} placeholder="Add a new onCall" onKeyPress={this.submitOnCall} id="onCall" />
                    </div>
                </div>
            </div>)
    }
}


export default OnCall

