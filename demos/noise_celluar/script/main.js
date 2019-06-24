!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=9)}([function(e,t,r){"use strict";e.exports=r(13)},function(e,t,r){e.exports=r(17)},function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t,r){var n=r(10),o=r(11),u=r(12);e.exports=function(e,t){return n(e)||o(e,t)||u()}},function(e,t,r){"use strict";(function(e){var n;(n=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(0)).enterModule)&&n(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var o,u,i=function(){var e=document.createElement("canvas");return e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.bottom="0",e.style.right="0",document.body.appendChild(e),e};t.a=i,(o=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(0)).default)&&o.register(i,"default","/Users/charten/Project/web/2019/webgl-learnning-demo-builder/src/utils/createCanvas.ts"),(u=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(0)).leaveModule)&&u(e)}).call(this,r(2)(e))},function(e,t,r){"use strict";(function(e){var n;(n=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(0)).enterModule)&&n(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var o,u,i=function(e){return new Promise(function(t,r){var n=new Image;n.crossOrigin="crossOrigin",n.onload=function(){return t(n)},n.onerror=function(){return r(n)},n.src=e})};t.a=i,(o=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(0)).default)&&o.register(i,"default","/Users/charten/Project/web/2019/webgl-learnning-demo-builder/src/utils/loadImage.ts"),(u=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(0)).leaveModule)&&u(e)}).call(this,r(2)(e))},function(e,t,r){"use strict";t.a="precision mediump float;\nattribute vec2 a_position;\nuniform vec2 u_resolution;\nvarying vec2 v_position;\n\nvoid main(){\n    vec2 st = 2.*a_position/u_resolution;\n    v_position=st;\n    gl_Position=vec4((st-1.)*vec2(1,-1),0.0,1.0);\n}"},function(e,t,r){"use strict";t.a="precision mediump float;\nuniform vec2 u_resolution;\nuniform vec2 u_tex1_size;\nuniform float u_time;\nuniform sampler2D u_tex1;\nvarying vec2 v_position;\n\nvec2 random(vec2 p){\n    return fract(\n        sin(\n            vec2(\n                dot(p,vec2(127.1,311.7)),\n                dot(p,vec2(269.5,183.3))\n            )\n        )*43758.5453\n    );\n}\n\nfloat noise_celluar(vec2 p){\n    vec2 i=floor(p);//获取当前网格索引i\n    vec2 f=fract(p);//获取当前片元在网格内的相对位置\n    float F1=1.;\n    for(int j=-1;j<=1;j++){\n        for(int k=-1;k<=1;k++){\n            vec2 neighbor=vec2(float(j),float(k));//周围格子向量\n            vec2 point=random(i+neighbor);\n            float d=length(point+neighbor-f);\n            F1=min(F1,d);\n        }\n    }\n    return F1;\n}\n\nvoid main(){\n    vec2 st=v_position;\n    vec3 color=vec3(\n        noise_celluar(st*10.+u_time)\n    );\n    vec2 offset=(vec2(5.))*10./u_tex1_size;\n    vec4 tex1_color=texture2D(u_tex1,st+(color.r)*offset);\n    tex1_color+=vec4(.5,.8,.9,0.)*color.r*.5;\n    tex1_color=mix(\n        texture2D(u_tex1,st),\n        tex1_color,\n        color.g\n    );\n    gl_FragColor=tex1_color;\n}"},function(e,t,r){e.exports=r.p+"demos/noise_celluar/index_banner.jpg"},function(e,t,r){"use strict";r.r(t),function(e){var t,n=r(3),o=r.n(n),u=r(1),i=r(4),a=r(5),c=r(6),l=r(7),f=r(8),s=r.n(f);(t=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(0)).enterModule)&&t(e);var d="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e},p=Object(i.a)(),m=p.getContext("webgl"),b=window.innerWidth*window.devicePixelRatio,y=window.innerHeight*window.devicePixelRatio,v=u.createProgram(m,c.a,l.a),g=new Float32Array([0,0,0,y,b,y,b,0]),_=u.createArrayBuffer(m,g),h={banner:m.createTexture()};p.width=b,p.height=y,Promise.all([Object(a.a)(s.a)]).then(d(function(e){var t=o()(e,1)[0];m.useProgram(v),u.updateTexture(m,m.TEXTURE0,h.banner,t),u.setProgramAttribute(m,v,{a_position:{type:"pointer",value:[2,m.FLOAT,!1,0,0]}}),u.setProgramUniform(m,v,{u_resolution:{type:"float",value:[b,y]},u_tex1_size:{type:"float",value:[t.width,t.height]},u_tex1:{type:"int",value:[0]},u_time:{type:"float",value:[0]}}),m.viewport(0,0,b,y),m.drawArrays(m.TRIANGLE_FAN,0,4),requestAnimationFrame(P)},"useProgram{}",function(){return[m.useProgram]}));var E,w,x=Date.now();function P(e){var t=Date.now();t-x<1e3/60?requestAnimationFrame(P):(x=t,u.setProgramUniform(m,v,{u_time:{type:"float",value:[.001*e]}}),m.clear(m.COLOR_BUFFER_BIT),m.drawArrays(m.TRIANGLE_FAN,0,4),requestAnimationFrame(P))}(E=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(0)).default)&&(E.register(p,"canvas","/Users/charten/Project/web/2019/webgl-learnning-demo-builder/src/demoes/noise_celluar/main.ts"),E.register(m,"gl","/Users/charten/Project/web/2019/webgl-learnning-demo-builder/src/demoes/noise_celluar/main.ts"),E.register(b,"w","/Users/charten/Project/web/2019/webgl-learnning-demo-builder/src/demoes/noise_celluar/main.ts"),E.register(y,"h","/Users/charten/Project/web/2019/webgl-learnning-demo-builder/src/demoes/noise_celluar/main.ts"),E.register(v,"program","/Users/charten/Project/web/2019/webgl-learnning-demo-builder/src/demoes/noise_celluar/main.ts"),E.register(g,"points","/Users/charten/Project/web/2019/webgl-learnning-demo-builder/src/demoes/noise_celluar/main.ts"),E.register(_,"buf","/Users/charten/Project/web/2019/webgl-learnning-demo-builder/src/demoes/noise_celluar/main.ts"),E.register(h,"textures","/Users/charten/Project/web/2019/webgl-learnning-demo-builder/src/demoes/noise_celluar/main.ts"),E.register(x,"lastTime","/Users/charten/Project/web/2019/webgl-learnning-demo-builder/src/demoes/noise_celluar/main.ts"),E.register(P,"run","/Users/charten/Project/web/2019/webgl-learnning-demo-builder/src/demoes/noise_celluar/main.ts")),(w=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:r(0)).leaveModule)&&w(e)}.call(this,r(2)(e))},function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},function(e,t){e.exports=function(e,t){var r=[],n=!0,o=!1,u=void 0;try{for(var i,a=e[Symbol.iterator]();!(n=(i=a.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,u=e}finally{try{n||null==a.return||a.return()}finally{if(o)throw u}}return r}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=(n=r(14))&&"object"==typeof n&&"default"in n?n.default:n;function u(e){return u.warnAboutHMRDisabled&&(u.warnAboutHMRDisabled=!0,console.error("React-Hot-Loader: misconfiguration detected, using production version in non-production environment."),console.error("React-Hot-Loader: Hot Module Replacement is not enabled.")),o.Children.only(e.children)}u.warnAboutHMRDisabled=!1;var i=function e(){return e.shouldWrapWithAppContainer?function(e){return function(t){return o.createElement(u,null,o.createElement(e,t))}}:function(e){return e}};i.shouldWrapWithAppContainer=!1;t.AppContainer=u,t.hot=i,t.areComponentsEqual=function(e,t){return e===t},t.setConfig=function(){},t.cold=function(e){return e},t.configureComponent=function(){}},function(e,t,r){"use strict";e.exports=r(15)},function(e,t,r){"use strict";
/** @license React v16.8.6
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(16),o="function"==typeof Symbol&&Symbol.for,u=o?Symbol.for("react.element"):60103,i=o?Symbol.for("react.portal"):60106,a=o?Symbol.for("react.fragment"):60107,c=o?Symbol.for("react.strict_mode"):60108,l=o?Symbol.for("react.profiler"):60114,f=o?Symbol.for("react.provider"):60109,s=o?Symbol.for("react.context"):60110,d=o?Symbol.for("react.concurrent_mode"):60111,p=o?Symbol.for("react.forward_ref"):60112,m=o?Symbol.for("react.suspense"):60113,b=o?Symbol.for("react.memo"):60115,y=o?Symbol.for("react.lazy"):60116,v="function"==typeof Symbol&&Symbol.iterator;function g(e){for(var t=arguments.length-1,r="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=0;n<t;n++)r+="&args[]="+encodeURIComponent(arguments[n+1]);!function(e,t,r,n,o,u,i,a){if(!e){if(e=void 0,void 0===t)e=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[r,n,o,u,i,a],l=0;(e=Error(t.replace(/%s/g,function(){return c[l++]}))).name="Invariant Violation"}throw e.framesToPop=1,e}}(!1,"Minified React error #"+e+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",r)}var _={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},h={};function E(e,t,r){this.props=e,this.context=t,this.refs=h,this.updater=r||_}function w(){}function x(e,t,r){this.props=e,this.context=t,this.refs=h,this.updater=r||_}E.prototype.isReactComponent={},E.prototype.setState=function(e,t){"object"!=typeof e&&"function"!=typeof e&&null!=e&&g("85"),this.updater.enqueueSetState(this,e,t,"setState")},E.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},w.prototype=E.prototype;var P=x.prototype=new w;P.constructor=x,n(P,E.prototype),P.isPureReactComponent=!0;var R={current:null},T={current:null},A=Object.prototype.hasOwnProperty,j={key:!0,ref:!0,__self:!0,__source:!0};function S(e,t,r){var n=void 0,o={},i=null,a=null;if(null!=t)for(n in void 0!==t.ref&&(a=t.ref),void 0!==t.key&&(i=""+t.key),t)A.call(t,n)&&!j.hasOwnProperty(n)&&(o[n]=t[n]);var c=arguments.length-2;if(1===c)o.children=r;else if(1<c){for(var l=Array(c),f=0;f<c;f++)l[f]=arguments[f+2];o.children=l}if(e&&e.defaultProps)for(n in c=e.defaultProps)void 0===o[n]&&(o[n]=c[n]);return{$$typeof:u,type:e,key:i,ref:a,props:o,_owner:T.current}}function O(e){return"object"==typeof e&&null!==e&&e.$$typeof===u}var U=/\/+/g,L=[];function C(e,t,r,n){if(L.length){var o=L.pop();return o.result=e,o.keyPrefix=t,o.func=r,o.context=n,o.count=0,o}return{result:e,keyPrefix:t,func:r,context:n,count:0}}function G(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>L.length&&L.push(e)}function k(e,t,r){return null==e?0:function e(t,r,n,o){var a=typeof t;"undefined"!==a&&"boolean"!==a||(t=null);var c=!1;if(null===t)c=!0;else switch(a){case"string":case"number":c=!0;break;case"object":switch(t.$$typeof){case u:case i:c=!0}}if(c)return n(o,t,""===r?"."+H(t,0):r),1;if(c=0,r=""===r?".":r+":",Array.isArray(t))for(var l=0;l<t.length;l++){var f=r+H(a=t[l],l);c+=e(a,f,n,o)}else if(f=null===t||"object"!=typeof t?null:"function"==typeof(f=v&&t[v]||t["@@iterator"])?f:null,"function"==typeof f)for(t=f.call(t),l=0;!(a=t.next()).done;)c+=e(a=a.value,f=r+H(a,l++),n,o);else"object"===a&&g("31","[object Object]"==(n=""+t)?"object with keys {"+Object.keys(t).join(", ")+"}":n,"");return c}(e,"",t,r)}function H(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}(e.key):t.toString(36)}function D(e,t){e.func.call(e.context,t,e.count++)}function F(e,t,r){var n=e.result,o=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?M(e,n,r,function(e){return e}):null!=e&&(O(e)&&(e=function(e,t){return{$$typeof:u,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(e,o+(!e.key||t&&t.key===e.key?"":(""+e.key).replace(U,"$&/")+"/")+r)),n.push(e))}function M(e,t,r,n,o){var u="";null!=r&&(u=(""+r).replace(U,"$&/")+"/"),k(e,F,t=C(t,u,n,o)),G(t)}function I(){var e=R.current;return null===e&&g("321"),e}var $={Children:{map:function(e,t,r){if(null==e)return e;var n=[];return M(e,n,null,t,r),n},forEach:function(e,t,r){if(null==e)return e;k(e,D,t=C(null,null,t,r)),G(t)},count:function(e){return k(e,function(){return null},null)},toArray:function(e){var t=[];return M(e,t,null,function(e){return e}),t},only:function(e){return O(e)||g("143"),e}},createRef:function(){return{current:null}},Component:E,PureComponent:x,createContext:function(e,t){return void 0===t&&(t=null),(e={$$typeof:s,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:f,_context:e},e.Consumer=e},forwardRef:function(e){return{$$typeof:p,render:e}},lazy:function(e){return{$$typeof:y,_ctor:e,_status:-1,_result:null}},memo:function(e,t){return{$$typeof:b,type:e,compare:void 0===t?null:t}},useCallback:function(e,t){return I().useCallback(e,t)},useContext:function(e,t){return I().useContext(e,t)},useEffect:function(e,t){return I().useEffect(e,t)},useImperativeHandle:function(e,t,r){return I().useImperativeHandle(e,t,r)},useDebugValue:function(){},useLayoutEffect:function(e,t){return I().useLayoutEffect(e,t)},useMemo:function(e,t){return I().useMemo(e,t)},useReducer:function(e,t,r){return I().useReducer(e,t,r)},useRef:function(e){return I().useRef(e)},useState:function(e){return I().useState(e)},Fragment:a,StrictMode:c,Suspense:m,createElement:S,cloneElement:function(e,t,r){null==e&&g("267",e);var o=void 0,i=n({},e.props),a=e.key,c=e.ref,l=e._owner;if(null!=t){void 0!==t.ref&&(c=t.ref,l=T.current),void 0!==t.key&&(a=""+t.key);var f=void 0;for(o in e.type&&e.type.defaultProps&&(f=e.type.defaultProps),t)A.call(t,o)&&!j.hasOwnProperty(o)&&(i[o]=void 0===t[o]&&void 0!==f?f[o]:t[o])}if(1===(o=arguments.length-2))i.children=r;else if(1<o){f=Array(o);for(var s=0;s<o;s++)f[s]=arguments[s+2];i.children=f}return{$$typeof:u,type:e.type,key:a,ref:c,props:i,_owner:l}},createFactory:function(e){var t=S.bind(null,e);return t.type=e,t},isValidElement:O,version:"16.8.6",unstable_ConcurrentMode:d,unstable_Profiler:l,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentDispatcher:R,ReactCurrentOwner:T,assign:n}},B={default:$},N=B&&$||B;e.exports=N.default||N},function(e,t,r){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(e){n[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var r,i,a=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),c=1;c<arguments.length;c++){for(var l in r=Object(arguments[c]))o.call(r,l)&&(a[l]=r[l]);if(n){i=n(r);for(var f=0;f<i.length;f++)u.call(r,i[f])&&(a[i[f]]=r[i[f]])}}return a}},function(e,t,r){"use strict";r.r(t);r.d(t,"setProgramAttribute",function(){return n}),r.d(t,"setProgramUniform",function(){return o}),r.d(t,"createProgram",function(){return u}),r.d(t,"createShader",function(){return i}),r.d(t,"createArrayBuffer",function(){return a}),r.d(t,"updateArrayBuffer",function(){return c}),r.d(t,"createTextureByImage",function(){return l}),r.d(t,"updateTexture",function(){return f}),r.d(t,"checkTexture",function(){return s}),r.d(t,"isPowerOf2",function(){return d});const n=function(e,t,r){var n="",o=null,u=0,i=0;for(var a in r)if(n=r[a].type,o=r[a].value,u=e.getAttribLocation(t,a),"pointer"!==n){if("float"===n&&Array.isArray(o)){if((i=o.length)<=0)continue;i>4&&(i=4),e["vertexAttrib"+i+"fv"](u,o)}}else e.enableVertexAttribArray(u),e.vertexAttribPointer(u,o[0],o[1],o[2],o[3],o[4])},o=function(e,t,r){var n="",o=null,u=0,i=0;for(var a in r)n=r[a].type,o=r[a].value,Array.isArray(o)&&(i=o.length,u=e.getUniformLocation(t,a),"int"!==n?"float"!==n||e["uniform"+i+"fv"](u,o):e["uniform"+i+"iv"](u,o))};function u(e,t,r){const n=e.createProgram();return i(e,n,t,e.VERTEX_SHADER),i(e,n,r,e.FRAGMENT_SHADER),e.linkProgram(n),n}function i(e,t,r,n){const o=e.createShader(n);return e.shaderSource(o,r),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)||console.warn(e.getShaderInfoLog(o)),e.attachShader(t,o),o}function a(e,t,r){const n=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,t,r||e.STATIC_DRAW),n}function c(e,t,r,n){return e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,r,n||e.STATIC_DRAW),t}function l(e,t){var r=e.createTexture();return e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),s(e,r,t.width,t.height)}function f(e,t,r,n){return e.activeTexture(t),e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),s(e,r,n.width,n.height)}function s(e,t,r,n){return d(r)&&d(n)?(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),t):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),t)}function d(e){return!(e&e-1)}}]);