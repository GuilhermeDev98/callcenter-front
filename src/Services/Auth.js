export const isAuthenticated = () => {
    const token = localStorage.getItem('call@token')
    const role = localStorage.getItem('call@userRole')

    if(role === "TI") {
        localStorage.setItem("call@canAccess", true)
        return true
    }else{
        const permissions = JSON.parse(localStorage.getItem('call@userPermissions'))

        const HasPermission = permissions.includes(window.location.pathname)
    
        if(token && HasPermission)
            return true
    }

};