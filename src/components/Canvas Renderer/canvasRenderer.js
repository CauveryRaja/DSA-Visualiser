import React, { Component } from 'react';
import './canvasRenderer.css';
import '../../fontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';

class CanvasRenderer extends Component {
    render() {
        return (
            <div className="canvasContainer">
                <canvas width="800" height="600"></canvas>
                <ul className="toolbar">
                    <li onClick={(e) => {console.log(e.target);this.addPanel.toggle(e)}}><FontAwesomeIcon icon="plus"/></li>
                    <li onClick={(e) => this.editPanel.toggle(e)}><FontAwesomeIcon icon="edit"/></li>
                    <li onClick={(e) => this.deletePanel.toggle(e)}><FontAwesomeIcon icon="trash"/></li>
                </ul>
                <OverlayPanel className="panel" ref={(el) => this.addPanel = el}>
                    <div className="form-group">
                        <label htmlFor="data">Data</label>
                        <input type="text" id="data"></input>
                    </div>
                    <div className="form-group">
                        <label for="index">Position</label>
                        <input type="text" id="index"></input>
                    </div>
                    <Button label="Add Data" className="p-button-success"></Button>
                </OverlayPanel>
                <OverlayPanel ref={(el) => this.editPanel = el}>
                    <label for="data">Data2</label>
                    <input type="text" id="data"></input><br></br>
                    <label for="index">Position</label>
                    <input type="text" id="index"></input>
                </OverlayPanel>
                <OverlayPanel ref={(el) => this.deletePanel = el}>
                    <label for="data">Data2</label>
                    <input type="text" id="data"></input><br></br>
                    <label for="index">Position</label>
                    <input type="text" id="index"></input>
                </OverlayPanel>
            </div>
        );
    }
}

export default CanvasRenderer;