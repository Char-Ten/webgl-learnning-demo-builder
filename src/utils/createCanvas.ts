export default function():HTMLCanvasElement{
    const canvas = document.createElement("canvas");
    canvas.style.position="fixed";
    canvas.style.top="0";
    canvas.style.left="0";
    canvas.style.bottom="0";
    canvas.style.right="0";
    document.body.appendChild(canvas);
    return canvas
}