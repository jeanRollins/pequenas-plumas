import React from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ComposedChart, Line
} from 'recharts';



export default function MyBarChart() {

    const colorCharts = {
      red    : '#ff3333'  ,
      blue   : '#3385ff'  , 
      green  : '#009933'  ,
      yellow : '#ffff1a'  ,
      purple : '#cc00ff'  ,
      gray   : '#8c8c8c'
    }

    const style = {
      width : '100%',
      height : '300px'
    }

    const data = [
      {
        name: 'Loro', Loro: 590 , uv:590
      },
      {
        name: 'Canario', Canario: 868, uv:868
      },
      {
        name: 'Paloma', Paloma: 1397, uv:1397
      },
      {
        name: 'Catitas', Catitas: 1480, uv:1480
      }
    ];


    return (
      <>

    
      <ComposedChart
        width={360}
        height={400}
        data={data}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Loro" barSize={20} fill={colorCharts.red} />
        <Bar dataKey="Canario" barSize={20} fill={colorCharts.blue} />

        <Bar dataKey="Paloma" barSize={20} fill={colorCharts.green} />
        <Bar dataKey="Catitas" barSize={20} fill={colorCharts.gray} />

        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
      </ComposedChart>
      </>
    );
  
}
