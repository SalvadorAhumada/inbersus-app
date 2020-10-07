import React from 'react'
import './App.css'

class App extends React.Component {
    state = { advice: '' }

    render() {
        const { advice } = this.state ;
        return (
            <div>
            <div className="app">
            <h1>TEST</h1>
          </div>
          </div>

        );
    }
}

export default App