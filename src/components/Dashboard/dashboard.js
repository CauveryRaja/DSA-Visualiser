import React, { Component } from 'react';
import './dashboard.css';
import DynamicArray from '../Data Structures/Dynamic Array/dynamicArray';

class Dashboard extends Component {
    state = {
        dataStructures: ['Dynamic Array', 'Linked List', 'Stack', 'Queue'],
        sortingAlgorithms: ['Merge Sort', 'Quick Sort', 'Bubble Sort']
    };

    render() {
        return (
            <main className="dashboardContainer">
                <DynamicArray data={this.state.sortingAlgorithms}></DynamicArray>
                {this.state.dataStructures.map(ds => {
                    return <div className="dsEntry">{ds}</div>
                })}

                {this.state.sortingAlgorithms.map(algo => {
                    return <div className="sortEntry">{algo}</div>
                })}
            </main>
        )
    }
}

export default Dashboard;