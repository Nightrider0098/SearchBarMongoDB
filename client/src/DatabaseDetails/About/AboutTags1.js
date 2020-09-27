import React, { Component } from 'react'
class AboutTags1 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tagList: ['...'],
            newTag: "",
            tagsUpdating: 0

        }
        this.enterHandler = this.enterHandler.bind(this)
        this.newTagHandler = this.newTagHandler.bind(this)
        this.LoadingIcon = this.LoadingIcon.bind(this)
        this.removeTag = this.removeTag.bind(this)
        this.buildTags = this.buildTags.bind(this)
    }


    enterHandler(event) {

        if (event.charCode === 13) {
            var tagList = this.state.tagList
            tagList.push(event.target.value)
            this.setState({ tagsUpdating: 1 })
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tableId: this.props.tableId || 'T001',
                    updatedTags: tagList
                })
            }
            fetch('/api/updateTags', options).then(ret => { return ret.json() }).then(ret => {
                if (ret['type'] === 'sucessful') {
                    this.setState({ tagsUpdating: 0 })
                }

            })
        }
    }
    newTagHandler(event) {
        this.setState({ newTag: event.target.value })
    }
    LoadingIcon() {
        if (this.state.tagsUpdating === 1) {
            return <i className="fa-2x fas fa-cog fa-spin"></i>
        }
        else { return <i class="fa-2x fas fa-tag"></i> }
    }
    buildTags(tList) {
        // alert(tList)
        var ret = []
        for (var i = 0; i < tList.length; i++) {

            const d = i;
            ret.push(
                <div class="alert alert-warning alert-dismissible fade show col-2 m-1" role="alert">
                    {tList[i]}

                    <button type="button" onClick={() => { this.removeTag(tList[d]) }} class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>)
        }
        return ret;
    }

    removeTag(person) {
        var t1 = this.state.tagList;
        // alert(person)
        var nt1 = t1.filter(e => { return (e !== person) })
        this.setState({ tagList: nt1 })
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tableId: this.props.tableId || 'T001',
                updatedTags: nt1
            })
        }
        fetch('/api/updateTags', options).then(ret => { return ret.json() }).then(ret => {
            if (ret['type'] === 'sucessful') {
                this.setState({ tagsUpdating: 0 })
            }
        })
    }

    componentDidMount() {
        fetch('/api/tableTags?dName=' + encodeURI(this.props.dName) + "&tName=" + encodeURI(this.props.tName)).then(res => { return res.json() }).then(res => {
            if (res['type'] === 'sucess') {
                this.setState({ tagList: res['data']['tagList'] })
            }
        }).catch(err => {
            console.log('failed to fetch tag details')
        })
    }

    render() {
        return (
            <div className="form-group">
                <label for="tags">Tags</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            {this.LoadingIcon()}
                        </div>
                        <input className="form-control" onChange={this.newTagHandler} value={this.state.newTag} placeholder="Add a new tag" onKeyPress={this.enterHandler} id="tags" />
                    </div>
                </div>
                <div className='container row m-2' style={{marginTop:'10px'}}>
                    {this.buildTags(this.state.tagList)}
                </div>
            </div>)
    }
}


export default AboutTags1

