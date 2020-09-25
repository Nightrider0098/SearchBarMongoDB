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

            // for (var i in this.state.Chartdata) {
            //     if (this.state.Chartdata[i].from_date in Object.keys(count)) {
            //         count[this.state.Chartdata[i].from_date] = count[this.state.Chartdata[i].from_date] + 1;
            //     }
            //     else {
            //         count[this.state.Chartdata[i].from_date] = 1;
            //     }

            // }


            this.chartRef = new Chart(ctx, {
                type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label: 'My First dataset',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [0, 10, 5, 2, 20, 30, 45]
                    }]
                },
        
              
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
