import React from 'react'
import TiDashboard from "./TiDashboard";
import N1Dashboard from "./N1Dashboard";

const GenerateDashboard = () => {
    const UserRole = localStorage.getItem("call@userRole")

    if(!UserRole){
        return <h1>Nenhuma Regra Foi Declarada Para esse usuário!</h1>
    }

    if(UserRole === "TI")
        return <TiDashboard/>;

    if(UserRole === "BKO")
        return <h1>Dashboard BKO</h1>

    if(UserRole === "N1")
        return <N1Dashboard/>
}

export default  GenerateDashboard;