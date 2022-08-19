import React, { useState } from "react";
import { Chart } from "react-google-charts";



const AttendancesOpen = () => {
    const [data, SetData] = useState([
        ["Horário", "Abertos", "Finalizados", "Em Tratamento"],
        ["00:00", 100, 90, 10],
        ["01:00", 90, 70, 20],
        ["02:00", 110, 50, 60],
        ["03:00", 50, 45, 5],
        ["04:00", 200, 150, 50],
    ])

    const [options, SetOptions] = useState({
        title: "Protocolos",
        hAxis: { title: "Data", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
        chartArea: { width: "50%", height: "70%" },
    })

    return (
        <Chart
          chartType="AreaChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      );
}



export default AttendancesOpen