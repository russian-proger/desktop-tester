import React from 'react';

/**
 * @param {CanvasRenderingContext2D} ctx
 */
function Rectangle(ctx) {
    let coords, dims, width, height;

    this.render = () => {
        ctx.strokeStyle = "#bbb";
        ctx.lineWidth = 2;
        ctx.strokeRect(coords[0], coords[1], dims[0], dims[1]);
    }

    this.update = () => {
        width = ctx.canvas.width;
        height = ctx.canvas.height;
        coords = [Math.random() * width, Math.random() * height];
        dims = [Math.random() * 40 + 40, Math.random() * 40 + 40];
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
function Circle(ctx) {
    let coords, radius, width, height;

    this.render = () => {
        ctx.strokeStyle = "#bbb";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(coords[0], coords[1], radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    this.update = () => {
        width = ctx.canvas.width;
        height = ctx.canvas.height;
        coords = [Math.random() * width, Math.random() * height];
        radius = Math.random() * 40 + 40;
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
function Triangle(ctx) {

}

const figures = [Rectangle, Circle];

export default function Background() {
    /** @type {React.Ref<HTMLCanvasElement>} */
    const canvasRef = React.useRef(null);

    React.useLayoutEffect(() => {
        /** @type {HTMLCanvasElement} */
        const cnv = canvasRef.current;
        const ctx = cnv.getContext('2d');

        let elements = new Array(20).fill(0).map(() => new figures[parseInt(Math.random() * figures.length)](ctx));

        ctx.strokeStyle = "#eee";
        ctx.fillStyle = "#eee";
        ctx.lineWidth = 5;

        const updateSizes = () => {
            cnv.width = canvasRef.current.parentElement.clientWidth;
            cnv.height = canvasRef.current.parentElement.clientHeight;
        }

        const render = () => {
            ctx.clearRect(0, 0, cnv.width, cnv.height);
            elements.forEach(v => v.update());
            elements.forEach(v => v.render());
        }

        window.addEventListener('resize', updateSizes);
        updateSizes();

        render();

    });

    return <div className="beautiful-background"><canvas ref={canvasRef} /></div>
}