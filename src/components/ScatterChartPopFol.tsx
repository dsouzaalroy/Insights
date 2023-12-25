
import React, { useEffect, useRef, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import {Chart, PointElement, LinearScale, Title, Legend, Point, Tooltip, TooltipModel} from 'chart.js';
import { Artists } from '../interfaces/Artists';
import { TooltipData } from '../interfaces/TooltipData';
Chart.register(PointElement,
    LinearScale,
    Title,
    Legend,
    Tooltip)

const ScatterChartPopFol = ({dataIn}:{dataIn:Artists[]}) => {

  const [visible, setVisible] = useState<String>("invisble");
  const [toolTipData, setTooltipData] = useState<TooltipData>({
    visible: false,
    position: {
      x:0,
      y:0,
    },
    index:0,
  })
  useEffect(() =>{
    if(dataIn.length > 0){
    }
  }, [dataIn])
  const formatNumber = (num:number) =>{
    if(!num)return;
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  }
  
  const getData=()=>{
      const data:Point[] = []
      for(let i =0; i<dataIn.length;i++){
          data[i] = {
              x:dataIn[i].followers.total,
              y:dataIn[i].popularity,
          }
      }
      return data;
  }
  function generateRandomColor(): string {
    // Generate random RGB values
    const red: number = Math.floor(Math.random() * 256);
    const green: number = Math.floor(Math.random() * 256);
    const blue: number = Math.floor(Math.random() * 256);
  
    // Calculate luminance of the color
    const luminance: number = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
  
    // Adjust luminance to ensure contrast with black
    const contrastThreshold: number = 0.3;
    const adjustedLuminance: number = luminance > contrastThreshold ? luminance : contrastThreshold + 0.1;
  
    // Convert RGB values to hexadecimal
    const hexColor: string = `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
  
    // Return the generated color if it has sufficient contrast with black
    return adjustedLuminance < 0.5 ? hexColor : generateRandomColor();
  }
  function getRandomNeonColor(): string {
    const neonColors: string[] = [
      '#ff00ff', // Neon Pink
      '#00ff00', // Neon Green
      '#ffff00', // Neon Yellow
      '#ff8000', // Neon Orange
      '#00ffff', // Neon Blue
      '#ff00bf', // Neon Purple
      '#ff0000', // Neon Red
      '#bfff00', // Neon Lime
      '#00ffbf', // Neon Turquoise
      '#ff8080', // Neon Coral
      // Add more neon colors here if desired
    ];
  
    const randomIndex = Math.floor(Math.random() * neonColors.length);
    return neonColors[randomIndex];
  }
  function getRandomColorWithMediumContrastToBlack(): string {
    const randomHue = Math.floor(Math.random() * 360); // Random hue value between 0 and 359
    const saturation = 60; // Random saturation between 25 and 75
    const lightness = 75; // Random lightness between 25 and 50
  
    const color = `hsl(${randomHue}, ${saturation}%, ${lightness}%)`;
    return color;
  }
  
  
  

  const externalToolTipHandler = (context:any) => {
    let tooltip: TooltipModel<any> = context.tooltip;
    let chart:Chart = context.chart;
    if(!chart)return;
    if(tooltip.opacity === 0){
      setTooltipData(prevData => ({ ...prevData, visible: false }));
      return;
    }

    const position:DOMRect = chart.canvas.getBoundingClientRect();

    setTooltipData({
      position:{
        x: position.left + window.pageXOffset + tooltip.caretX + 10,
        y: position.top + window.pageYOffset + tooltip.caretY + 10,
      },
      visible:true,
      index: tooltip.dataPoints[0].dataIndex,
    })

  }

  const data = {
    datasets: [
        {
          label: "Artists",
        data: getData(),
          // backgroundColor: "#FFD70080",
          backgroundColor: getRandomColorWithMediumContrastToBlack(),
        },
      ],
  };

  const options = {
    elements:{
        point:{
            radius:6,
        },
    },

    scales: {
      x: {
        offset:true,
        type: 'linear' as 'linear',
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
            text:'Followers',
            font:{
                family: 'Raleway',
                size:22,
            },
            color: 'white',
        },

      },
      y: {
        type: 'linear' as 'linear', 
        position: 'left' as 'left',
        beginAtZero:true,
        ticks:{
            color: 'white',
            stepSize:10,
            font:{
                family: 'Raleway',
                size: 18,
            }
        },
        border:{
          color: '#B3B3B3',
          width:2,
        },
        title:{
            display:true,
            text:'Popularity',
            font:{
                family: 'Raleway',
                size:22,
            },
            color: 'white',
        },
        min:0,
        suggestedMax:100
      },
      
    },    
    plugins:{
        legend:{
            display:false,
        },
        tooltip: {
          enabled: false,
          position: 'nearest' as 'nearest',
          external: externalToolTipHandler
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
  const style:Object = {

    opacity: toolTipData.visible?0.9:0,
    position: "absolute",
    left: toolTipData.position.x,
    top: toolTipData.position.y,
    backgroundColor: "#E5E4E2"

  }
  const render = (
    <div className={`${visible}`}>
      <Scatter data={data} options={options} />
      <div className = "pointer-events-none rounded-md border-white border-2 px-6 py-6" style = {style}>
        <div className='grid auto-rows-max grid-flow-col gap-4'>
            <img className ="h-22 w-22 row-span-3" alt ="Artist" src={`${dataIn[toolTipData.index]?.images[2]?.url}`}/>
            <div className ="col-start-2 row-start-1 text-lg">{dataIn[toolTipData?.index]?.name}</div>
            <div className ="col-start-2 row-start-2 ">
              <div className ="">Followers: {formatNumber(dataIn[toolTipData?.index]?.followers.total)}</div>
              <div className ="">Popularity: {dataIn[toolTipData?.index]?.popularity}</div>
            </div>
        </div>



      </div>
    </div>
  )

  return (
    // Only render if data is not 0
    dataIn.length > 0 ? render:<div></div>
    
  );
};

export default ScatterChartPopFol;
