import React from 'react'

const Can = ({permission, children, showMessage}) => {

    const CanAcessThisComponent = localStorage.getItem('call@userPermissions').includes(permission)

    if (CanAcessThisComponent) {
        return <>{children}</>
    } else if(showMessage) {
        return <b>Não Pode Acessar </b>
    }else{
        return;
    }
}

export default Can