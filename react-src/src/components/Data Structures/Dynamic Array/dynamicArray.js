import React, { Component, ReactPropTypes } from 'react';

class DynamicArray extends Component {
    render() {
        return (
            <main>
                {this.props.data}
            </main>
        );
    }
}

DynamicArray.ReactPropTypes = {
    data: ReactPropTypes.array.isRequired
}

export default DynamicArray;