import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    BarElement,
} from 'chart.js';
import axios from "axios"; 
import { Bar } from 'react-chartjs-2';
import React from 'react';

export default function SingleGraph(props) {
    const [labels, setLabels] = React.useState([]);
    const [datas, setDatas] = React.useState([]);
    const [loading, setLoading] = React.useState(false); 

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Tooltip,
        Filler
    );
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };
    
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Valore',
                data: datas,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const loadDatasForGraph = async () => {
        setLoading(true); 

        const response = await axios.get( 
            props.URL[0]
        ); 

        let myDatas = [];
        let myLabes = [];

        console.log(response.data)
        response.data.map(e => {
            switch (props.URL[1]) {
                case "Livello Idrico":
                    myDatas.push((e.valore).replace(" m", ""));
                    myLabes.push(e.stazione);
                    break;
                case "Onde Laguna":
                    myDatas.push((e.VALORE).split(" ")[1].split(" ")[0]);
                    myLabes.push(e.STAZIONE);
                    break;
                default:
                    break;
            }
            
        })
        setDatas(myDatas);
        setLabels(myLabes);

        console.log(response.data); 
        setLoading(false); 
    }

    React.useEffect(() => {
        loadDatasForGraph()
    }, [])

    return (
        <div className='ml-5'>
            <Bar options={options} data={data} />
        </div>
    )
}