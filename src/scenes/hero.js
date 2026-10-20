import * as THREE from 'three';
// Lightweight hero: one point-sphere + a few links. Removes the canvas (CSS background remains) if WebGL fails.
export function initHero(canvas){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const low=innerWidth<700||(navigator.hardwareConcurrency||4)<=4;
  let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:!low});}catch{canvas.remove();return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,low?1.5:2));
  const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(50,1,.1,50);cam.position.z=4.2;
  const N=low?500:1400,pos=new Float32Array(N*3);
  for(let i=0;i<N;i++){const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),a=i*2.39996;
    pos.set([Math.cos(a)*r*1.5,y*1.5,Math.sin(a)*r*1.5],i*3);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));
  const globe=new THREE.Points(g,new THREE.PointsMaterial({color:0xffcc00,size:.02,transparent:true,opacity:.85}));
  const L=[];for(let i=0;i<(low?10:24);i++){const a=Math.floor(Math.random()*N),b=Math.floor(Math.random()*N);
    L.push(pos[a*3],pos[a*3+1],pos[a*3+2],pos[b*3],pos[b*3+1],pos[b*3+2]);}
  const lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.Float32BufferAttribute(L,3));
  globe.add(new THREE.LineSegments(lg,new THREE.LineBasicMaterial({color:0x8899ff,transparent:true,opacity:.25})));
  scene.add(globe);
  let mx=0,my=0,sy=0;
  addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;},{passive:true});
  addEventListener('scroll',()=>{sy=scrollY/innerHeight;},{passive:true});
  const resize=()=>{const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();};
  addEventListener('resize',resize);resize();
  let run=true;new IntersectionObserver(([e])=>run=e.isIntersecting).observe(canvas);
  (function loop(){requestAnimationFrame(loop);if(!run)return;
    if(!reduce)globe.rotation.y+=.0015;
    globe.rotation.x+=((my*.6+sy*.4)-globe.rotation.x)*.04;globe.position.x+=(mx*.5-globe.position.x)*.04;
    renderer.render(scene,cam);})();
}
