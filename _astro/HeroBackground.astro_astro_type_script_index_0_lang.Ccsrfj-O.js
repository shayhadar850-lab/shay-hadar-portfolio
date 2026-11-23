import{r as f,c as W}from"./client.DKKFJjQ5.js";var F={exports:{}},R={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var O;function D(){if(O)return R;O=1;var t=Symbol.for("react.transitional.element"),c=Symbol.for("react.fragment");function i(o,n,r){var d=null;if(r!==void 0&&(d=""+r),n.key!==void 0&&(d=""+n.key),"key"in n){r={};for(var m in n)m!=="key"&&(r[m]=n[m])}else r=n;return n=r.ref,{$$typeof:t,type:o,key:d,ref:n!==void 0?n:null,props:r}}return R.Fragment=c,R.jsx=i,R.jsxs=i,R}var z;function H(){return z||(z=1,F.exports=D()),F.exports}var u=H();const V=`
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`,Y=`
  precision highp float;

  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform float u_scale;
  uniform float u_noise;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  float grain(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
  }

  vec2 centered(vec2 uv) {
    vec2 p = uv - 0.5;
    p.x *= u_resolution.x / max(u_resolution.y, 1.0);
    return p;
  }

  mat2 rot(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
  }

  vec3 shade(vec2 uv, float time) {
    vec2 q = rot(0.6) * centered(uv) * 2.0 * u_scale;
    float t = time * 0.6;
    float pixel = 2.0 * u_scale / max(u_resolution.y, 1.0);

    vec3 color = mix(u_color2, u_color2 * 0.45, clamp(length(centered(uv)) * 1.3, 0.0, 1.0));

    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      float bend = mod(fi, 2.0) * 2.0 - 1.0;

      float crease = (fi - 2.5) * 0.4
                   + 0.26 * sin(q.x * (1.05 + 0.12 * fi) + fi * 1.9 + t * (0.25 + 0.05 * fi))
                   + 0.1 * bend * q.x * q.x;
      float s = q.y - crease;
      float pane = smoothstep(-pixel, pixel, s);
      float back = max(s, 0.0);

      float body = exp(-back * 1.7);
      float fresnel = exp(-back * 8.0);
      float rim = exp(-back * 80.0);
      float interior = (back - 0.045) / 0.014;
      float inner = exp(-interior * interior);
      float bloom = exp(-abs(s) * 20.0);

      vec3 tint = mix(u_color1, u_color3, clamp(fresnel * 0.6 + 0.08 + 0.14 * sin(fi * 2.1 + q.x * 0.8 + t * 0.2), 0.0, 1.0));
      vec3 light = tint * pane * (body * 0.42 + fresnel * 0.4)
                 + u_color3 * (pane * (rim * 0.6 + inner * 0.12) + bloom * 0.1);

      color += light * (1.0 - color);
    }

    return clamp(color, 0.0, 1.0);
  }

  void main() {
    vec3 color = shade(vUv, u_time);
    if (u_noise > 0.001) {
      float g = grain(vUv * 200.0 + u_time * 0.1);
      color *= 1.0 - u_noise * 0.4 + u_noise * g * 0.4;
    }
    gl_FragColor = vec4(color, 1.0);
  }
`;function P(t){const c=t.replace("#",""),i=c.length===3?c.split("").map(n=>n+n).join(""):c,o=parseInt(i,16);return[(o>>16&255)/255,(o>>8&255)/255,(o&255)/255]}function G(t,c,i){const o=t.createShader(c);return o?(t.shaderSource(o,i),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)?o:(t.deleteShader(o),null)):null}function X({color1:t="#1e3cc8",color2:c="#06081e",color3:i="#96d7ff",speed:o=.5,scale:n=1,noise:r=.12,className:d,onAvailabilityChange:m}){const p=f.useRef(null),l=f.useRef({color1:t,color2:c,color3:i,speed:o,scale:n,noise:r,onAvailabilityChange:m}),v=f.useRef(()=>{});return l.current={color1:t,color2:c,color3:i,speed:o,scale:n,noise:r,onAvailabilityChange:m},f.useEffect(()=>{const s=p.current,e=s?.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!s||!e){l.current.onAvailabilityChange?.(!1);return}const A=G(e,e.VERTEX_SHADER,V),y=G(e,e.FRAGMENT_SHADER,Y),h=e.createProgram(),L=e.createBuffer(),k=()=>{e.deleteShader(A),e.deleteShader(y),e.deleteBuffer(L),e.deleteProgram(h)};if(!A||!y||!h||!L){k(),l.current.onAvailabilityChange?.(!1);return}if(e.attachShader(h,A),e.attachShader(h,y),e.linkProgram(h),!e.getProgramParameter(h,e.LINK_STATUS)){k(),l.current.onAvailabilityChange?.(!1);return}e.useProgram(h),e.bindBuffer(e.ARRAY_BUFFER,L),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW);const j=e.getAttribLocation(h,"position");e.enableVertexAttribArray(j),e.vertexAttribPointer(j,2,e.FLOAT,!1,0,0);const x=a=>e.getUniformLocation(h,a),b={time:x("u_time"),color1:x("u_color1"),color2:x("u_color2"),color3:x("u_color3"),scale:x("u_scale"),noise:x("u_noise"),resolution:x("u_resolution")},S=matchMedia("(prefers-reduced-motion: reduce)");let M=0,_,E=0,C=!1,w=!0;const T=()=>{const a=l.current;e.uniform1f(b.time,M),e.uniform3fv(b.color1,P(a.color1)),e.uniform3fv(b.color2,P(a.color2)),e.uniform3fv(b.color3,P(a.color3)),e.uniform1f(b.scale,a.scale),e.uniform1f(b.noise,a.noise),e.uniform2f(b.resolution,s.width,s.height),e.drawArrays(e.TRIANGLES,0,6)},q=()=>{const a=Math.min(devicePixelRatio||1,1.25,1200/Math.max(s.clientWidth,1));s.width=Math.max(1,Math.round(s.clientWidth*a)),s.height=Math.max(1,Math.round(s.clientHeight*a)),e.viewport(0,0,s.width,s.height),w&&T()},I=a=>{_??=a,a-_>=29&&(M+=Math.min((a-_)/1e3,.1)*l.current.speed,_=a,T()),E=requestAnimationFrame(I)},g=()=>{cancelAnimationFrame(E),_=void 0,w&&(C&&!document.hidden&&!S.matches&&l.current.speed!==0?E=requestAnimationFrame(I):T())},U=()=>{w=!1,cancelAnimationFrame(E),l.current.onAvailabilityChange?.(!1)};s.addEventListener("webglcontextlost",U);const N=new ResizeObserver(q),B=new IntersectionObserver(([a])=>{C=a.isIntersecting,g()});return N.observe(s),B.observe(s),S.addEventListener("change",g),document.addEventListener("visibilitychange",g),v.current=g,q(),l.current.onAvailabilityChange?.(!e.isContextLost()),()=>{cancelAnimationFrame(E),v.current=()=>{},N.disconnect(),B.disconnect(),S.removeEventListener("change",g),document.removeEventListener("visibilitychange",g),s.removeEventListener("webglcontextlost",U),k()}},[]),f.useEffect(()=>{v.current()},[t,c,i,o,n,r]),u.jsx("canvas",{ref:p,"aria-hidden":"true",className:d})}function $(){const[t,c]=f.useState(null),[i,o]=f.useState(!1),n=f.useRef(null);return f.useEffect(()=>{const r=n.current;if(t!==!1||!r)return;const d=matchMedia("(prefers-reduced-motion: reduce)");let m=!1;const p=()=>{if(d.matches||i||!m||document.hidden){r.pause();return}if(!r.hasAttribute("src")){const v=r.canPlayType('video/webm; codecs="vp9"')?"webm":"mp4";r.src=new URL("media/glass-fold."+v,document.baseURI).href}r.play().catch(v=>{v.name==="NotAllowedError"&&o(!0)})},l=new IntersectionObserver(([v])=>{m=v.isIntersecting,p()});return l.observe(r),d.addEventListener("change",p),document.addEventListener("visibilitychange",p),()=>{l.disconnect(),d.removeEventListener("change",p),document.removeEventListener("visibilitychange",p),r.pause()}},[t,i]),u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"glass-hero-art","aria-hidden":"true",children:[t===!1&&u.jsx("video",{ref:n,muted:!0,loop:!0,playsInline:!0,preload:"none",className:"glass-hero-video"}),u.jsx(X,{color1:"#1e3cc8",color2:"#06081e",color3:"#96d7ff",speed:i?0:1.25,noise:.12,scale:1,onAvailabilityChange:c,className:t===!0?"block size-full":"block size-full opacity-0"})]}),t!==null&&u.jsx("button",{type:"button",className:"glass-motion-toggle","aria-label":"השהיית אנימציית הבאנר","aria-pressed":i,title:i?"הפעלת אנימציית הבאנר":"השהיית אנימציית הבאנר",onClick:()=>o(!i),children:u.jsx("svg",{width:"16",height:"16",viewBox:"0 0 20 20",fill:"none","aria-hidden":"true",children:i?u.jsx("path",{d:"M7.5 5.5 14 10l-6.5 4.5z",stroke:"currentColor",strokeWidth:"1.65",strokeLinejoin:"round"}):u.jsx("path",{d:"M7 5v10m6-10v10",stroke:"currentColor",strokeWidth:"1.65",strokeLinecap:"round"})})})]})}const J=document.getElementById("glass-hero-mount");J&&W.createRoot(J).render(f.createElement($));
