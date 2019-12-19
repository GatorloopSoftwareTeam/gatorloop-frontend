import React, {Component} from 'react'

import Row from "react-bootstrap/Row"
import Column from "react-bootstrap/Column"
import axios from 'axios'

class PurchaseOrders extends Component
{
    state = {
        POs: [] 
    }

    constructor(props)
    {
        super(props)
        this.getPOs()
    }
    
    getPOs = () =>
    {

    }

    render()
    {
        return (
            
        )
    }

}

export default PurchaseOrders