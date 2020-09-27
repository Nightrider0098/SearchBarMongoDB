import React, { Component } from 'react'

class Tags extends Component {


    render() {
        return (

            // <div className='badge badge-info d-inline m-1'>
            //     {this.props.tag}
            //                  </div>

            <div class="alert alert-warning alert-dismissible fade show col-2" role="alert">
                {this.props.tag}
                <button type="button" onClick={() => { this.props.removeTag(this.props.tag) }} class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
}

export default Tags
