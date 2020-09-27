import React, { Component } from 'react'
import Tags from './AboutTags1'
import OnCall from './OnCall'
import Description from './Description'
import './styles.css'
class About extends Component {
    constructor(props) {
        super(props)

        this.state = {
            owner: '...',
            createdAt: '...',
            lastModified: '...',
            tName: 'emp',
            dName: 'githubdatabase'
        }
    }

    componentDidMount() {
        fetch('/api/FetchAbout?dName=' + this.props.dName,).then(response => response.json()).then(data => {
            this.setState({ ...data['data'], createdAt: data['createdAt'], LastModified: data['LastModified'] })
        }).catch((err) => {
            console.log("error while fetching details about tableDescription")
        })
    }
    render() {
        return (
            <div className='container' id='list-item-1'>
                <div className="panel panel-default">
                    <div className="panel-heading"><strong>About</strong></div>
                    <div className="panel-body">
                        <Description tName={this.state.tName} dName={this.state.dName} />
                        <Tags tName={this.state.tName} dName={this.state.dName} />
                        <OnCall tName={this.state.tName} dName={this.state.dName} />
                        <div className="row">
                            <div className='col-sm-2' >Owner</div>
                            <div className='col-sm-10'>
                                {this.state.Owner}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-2'>Created At</div>
                            <div className='col-sm-10'>
                                {new Date(this.state.createdAt).toDateString()}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-2'>Last Modified</div>
                            <div className='col-sm-10'>
                                {new Date(this.state.LastModified).toDateString()}
                            </div>
                        </div>

                    </div>
                </div>
            </div >)
    }
}

export default About
