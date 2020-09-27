import { Bar } from 'react-chartjs-2';
import React, { Component } from 'react'
// import Barchar from './Barchart'
class plotGraph extends Component {
    constructor(props) {
        super(props)

        this.state = {
            labels: [1, 2, 3, 4, 5],
            data: [5, 2, 4, 5, 8]
        }
    }
    componentDidMount() {
        var lenLabel = this.props.data.length
        var finalLabel = []
        var finalData = []
        for (var i = 1; i <= lenLabel; i++) {
            finalLabel.push(i)
            finalData.push(this.props.data[i-1]['row_count'])
        }
        this.setState({ label: finalLabel, data: finalData })
    }

    render() {
        return (


            < Bar data={{
                labels: this.state.labels,
                datasets: [{
                    fill: false,
                    label: 'Partitions Row Count',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: this.state.data
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
