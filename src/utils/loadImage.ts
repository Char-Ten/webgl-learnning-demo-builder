export default function(src:string):Promise<HTMLImageElement>{
    return new Promise((res,rej)=>{
        let img = new Image();
        img.crossOrigin='crossOrigin';
        img.onload=()=>res(img);
        img.onerror=()=>rej(img);
        img.src=src;
    })
}