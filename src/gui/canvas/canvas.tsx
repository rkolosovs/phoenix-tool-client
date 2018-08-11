import * as React from "react";
import * as ReactDOM from 'react-dom';

export default class Canvas extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const canvas = (ReactDOM.findDOMNode(this.refs.canvas) as HTMLCanvasElement);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0, canvas.width, canvas.height);

        //drawing functions get called here
    }
    render() {
        return (
            <canvas ref={'canvas'} id={'canvas'}/>
        );
    }
}