import React, { Component } from 'react'
import requireAuth from './requireAuth';

class Favorites extends Component {
    render() {
        return (
            <div className="white row center card-panel">
                <h1>This is my favorites page</h1>
            </div>
        )
    }
}

export default requireAuth(Favorites);