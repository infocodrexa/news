import React, { useReducer, useState } from 'react'
import storeReducer from './storeReducer'
import storeContext from './storeContext'
import decode_token from '../utils/index'

const StorePovider = ({ children }) => {

    const [store, dispatch] = useReducer(storeReducer, {
        userInfo: decode_token(localStorage.getItem('newsToken')),
        token: localStorage.getItem('newsToken') || ""
    })

    const [searchPar, setSearchPar] = useState('')

    return <storeContext.Provider value={{ store, dispatch ,searchPar, setSearchPar}}>
        {children}
    </storeContext.Provider>
}

export default StorePovider