import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {Chart, PointElement, LinearScale, Title, Legend, Point} from 'chart.js';
Chart.register(PointElement,
    LinearScale,
    Title,
    Legend)

const ScatterChartTimeMood = ({dataIn}:{dataIn:Point[]}) => {

    const batchDefineColour = (data:Point[]) => {
        const colours: string[] = [];
        for(let i =0; i<data.length;i++){
            colours[i] = defineValenceColour(data[i].y)
        }
        return colours;
    }

    const defineValenceColour = (value: number) => {
        // Define the RGB values for blue and yellow
        // const blue = [0, 0, 255];
        const blue = [26, 167, 236];

        const yellow = [255, 255, 0];

        // Interpolate the RGB values based on the input value
        const interpolatedColor = blue.map((channel, index) => {
            const colorDifference = yellow[index] - channel;
            return Math.round(channel + colorDifference * value);
        });

        // Convert the interpolated RGB values to hexadecimal color code
        const hexColor = interpolatedColor
            .map(channel => channel.toString(16).padStart(2, '0'))
            .join('');

        return `#${hexColor}`;
    }

  
  const data = {
    datasets: [
      {
        label: 'Scatter Chart',
        data: dataIn,
        // backgroundColor: 'rgba(54, 162, 235, 0.5)', // Set the point color
        backgroundColor: batchDefineColour(dataIn), // Set the point color
        // borderColor: 'rgba(54, 162, 235, 1)', // Set the border color
      },
    ],
  };

  // Define chart options
  const options = {
    elements:{
        point:{
            radius:6,
        },
    },

    scales: {
      x: {
        // max:24,
        type: 'linear' as 'linear', // Use linear scale for x-axis
        position: 'bottom' as 'bottom',
        beginAtZero:false,
        border:{
            color: '#B3B3B3',
            width:2,
          },
        ticks:{
            color: 'white',
            font:{
                family: 'Raleway',
                size: 18,
            }
        },
        title:{
            display:true,
            text:'Time',
            font:{
                family: 'Raleway',
                size:22,
            },
            color: 'white',
        },

      },
      y: {
        type: 'linear' as 'linear', // Use linear scale for y-axis
        position: 'left' as 'left',
        border:{
            color: '#B3B3B3',
            width:2,
          },
        ticks:{
            color: 'white',
            font:{
                family: 'Raleway',
                size: 18,
            }
        },
        title:{
            display:true,
            text:'Valence',
            font:{
                family: 'Raleway',
                size:22,
            },
            color: 'white',
        }
      },
      
    },    
    plugins:{
        legend:{
            display:false,
        },
    },
    layout:{
        padding:{
            right: 400,
            left:400,
            top: 100,
            bottom: 300,
        },
    },


  };

  return <Scatter data={data} options={options} />;
};

export default ScatterChartTimeMood;
