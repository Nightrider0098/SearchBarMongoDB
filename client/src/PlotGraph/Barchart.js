import React, { Component } from 'react'
import Chart from 'chart.js'
// import con from '../'
class BarChart extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            Chartdata: ""
        }
    }




    componentDidMount() {
        fetch('http://localhost:5400/BigData').then(res => { return res.json() }).then(res => { this.setState({ Chartdata: res }) })
    }
    componentDidUpdate() {
        if (this.state.Chartdata !== "") {
            // Global Options
            Chart.defaults.global.defaultFontFamily = 'Lato';
            Chart.defaults.global.defaultFontSize = 18;
            Chart.defaults.global.defaultFontColor = '#777';
            const canvas = this.canvasRef.current;
            const ctx = canvas.getContext("2d")
            var count = {}
            // var coulmns = []

            for (var i in this.state.Chartdata) {
                if (this.state.Chartdata[i].from_date in Object.keys(count)) {
                    count[this.state.Chartdata[i].from_date] = count[this.state.Chartdata[i].from_date] + 1;
                }
                else {
                    count[this.state.Chartdata[i].from_date] = 1;
                }

            }


            this.chartRef = new Chart(ctx, {
                type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
                data: {
                    labels: Object.keys(count),
                    datasets: [{
                        label: 'Population',
                        data: Object.values(count),
                        //backgroundColor:'green',
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)'

                        ],
                        borderWidth: 1,
                        borderColor: '#777',
                        hoverBorderWidth: 3,
                        hoverBorderColor: '#000'
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Largest Cities In Massachusetts',
                        fontSize: 25
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor: '#000'
                        }
                    },
                    layout: {
                        padding: {
                            left: 50,
                            right: 0,
                            bottom: 0,
                            top: 0
                        }
                    },
                    tooltips: {
                        enabled: true
                    }
                }
            });

        }
    }
    render() {
        return (

            <canvas id="myChart" ref={this.canvasRef} ></canvas>

        )
    }
}

export default BarChart
