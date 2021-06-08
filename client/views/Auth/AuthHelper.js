const auth = {
    isAuthenticated() {
        if (typeof window == 'undefined') return false
        if (localStorage.getItem('data')) 
            return JSON.parse(localStorage.getItem('data'))
            else return false
    }
}

export default auth
