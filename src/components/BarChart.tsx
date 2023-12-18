import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function BarChart({num, name}:{num:number[], name:string[]}){
    const generateRandomPastelColor = () =>{
        const red = Math.floor(Math.random() * 76) + 180;
        const green = Math.floor(Math.random() * 76) + 180;
        const blue = Math.floor(Math.random() * 76) + 180;
      
        const alpha = 0.8;
      
        const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      
        return color;
        }
    
        const batchGenerate = (values: number[]) =>{
            const colours:string[] = [];
            for(let i = 0; i< values.length; i++){
                colours[i] = generateRandomPastelColor();
            }
            return colours;
        } 

    const options = {
        scales:{
            y:{
                beginAtZero:true,
                ticks:{
                    color: 'white',
                    font:{
                        family: 'Raleway',
                        size: 18,
                    }
                }
            },
            x:{
                display:false,
            }
        },
        indexAxis: 'y' as const,
        layout:{
            padding:{
                right: 400,
                left:400,
                top: 100,
                bottom: 300,
            },
        },
        elements: {
            bar: {
                borderRadius:25,
                borderSkipped:false,
            },
        },
        plugins: {
            datalabels: {
                anchor: 'end' as 'end',
                align: 'end' as 'end',
                color: 'white',
                font: {
                  weight: 'bold' as 'bold',
                  size: 14,
                }
              },
            legend: {
                display:false,
            },
            title: {
                display: false,
            },
            tooltip:{
                enabled:false,
            },
    },};
    const data = {
        labels: name.slice(0, 15),
        datasets: [
          {
            data: num.slice(0, 15),
            backgroundColor: batchGenerate(num),
            barPercentage:0.5,
            datalabels: {
                display: true,
                formatter: (value:number) => value,
            }
          },
        ],
      };
      

    return(
        <Bar options = {options} data = {data} plugins={[ChartDataLabels]}/>
    )
}export default BarChart;