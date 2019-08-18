export default function():void{
	var time:any = null;
	setFontSize(Math.min(window.innerWidth,window.innerHeight));
	window.addEventListener(
        'onorientationchange' in window ? 'orientationchange' : 'resize',
        function() {
            if (Math.abs(<number>window.orientation) !== 90) {
                clearTimeout(time);
                time = setTimeout(function() {
                    clearTimeout(time);
                    setFontSize(Math.min(window.innerWidth,window.innerHeight));
                }, 200);
            }
        },
        false
    );
	function setFontSize(k:number):void {
		if(k>414)k=414;
        document.documentElement.style.fontSize =
            (((k / 750) * 100) / 16) * 100 + '%';
	}
}