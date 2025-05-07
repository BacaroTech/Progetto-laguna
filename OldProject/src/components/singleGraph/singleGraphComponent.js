import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    Filler,
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

        //console.log(response.data)
        response.data.map(e => {
            switch (props.URL[1]) {
                case "Livello Idrico":
                    if (e.valore)
                        myDatas.push((e.valore).replace(" m", ""));
                    myLabes.push(e.stazione);
                    break;
                case "Livello del vento":
                    if(e.valore)
                        myDatas.push((e.valore).split(" ")[0]);
                    myLabes.push(e.stazione);
                    break;
                case "Livello di pressione":
                    if(e.valore)
                        myDatas.push((e.valore).split(" ")[0]);
                    myLabes.push(e.stazione);
                    break;
                case "Livello di umidità":
                    if(e.valore)
                        myDatas.push((e.valore).split(" ")[0]);
                    myLabes.push(e.stazione);
                    break;
                case "Livello di sole":
                    //console.log(e.valore)
                    if(e.valore){
                        let v = e.valore;
                        if (v < 0)
                            v = 0
                        myDatas.push((v).split(" ")[1]);
                    }
                    myLabes.push(e.stazione);
                    break;
                default:
                    break;
            }
            
        })
        setDatas(myDatas);
        setLabels(myLabes);

        //console.log(response.data); 
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