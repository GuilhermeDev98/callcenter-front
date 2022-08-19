export const isAuthenticated = () => {
    const token = localStorage.getItem('call@token')

    if (token)
        return true

};