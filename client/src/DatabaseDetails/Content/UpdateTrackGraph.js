import { Line } from 'react-chartjs-2';
import React, { Component } from 'react'
import './Styles.css'
// import Barchar from './Barchart'
class plotGraph extends Component {
    render() {
        return (


            < Line data={{
                labels: this.props.labels,
                datasets: [{
                    fill: false,
                    label: 'Dataset Row Count',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: this.props.data
                }]
            }
            }
                options={{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            }
                        }]
                    }
                }} />
        )

    }
}

export default plotGraph
