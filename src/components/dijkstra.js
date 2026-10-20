// Interactive Dijkstra demo. The Python version uses heapq; here a sorted array plays the priority queue.
const N=[[60,160],[180,60],[180,260],[320,160],[460,70],[460,250],[590,160]];
const E=[[0,1,4],[0,2,2],[1,3,5],[2,3,8],[2,1,1],[3,4,3],[3,5,6],[4,6,2],[5,6,3],[4,5,1]];
export function initGraph(cv,btn,out){
  const c=cv.getContext('2d');let target=6,found=new Set(),path=[];
  const adj=N.map(()=>[]);E.forEach(([a,b,w])=>{adj[a].push([b,w]);adj[b].push([a,w]);});
  const edgeOn=(a,b)=>{const i=path.indexOf(a);return i>=0&&(path[i+1]===b||path[i-1]===b);};
  function draw(){c.clearRect(0,0,640,320);c.font='13px sans-serif';
    E.forEach(([a,b,w])=>{const on=edgeOn(a,b);
      c.strokeStyle=on?'#ffcc00':'#33334d';c.lineWidth=on?3:1.5;c.beginPath();c.moveTo(...N[a]);c.lineTo(...N[b]);c.stroke();
      c.fillStyle='#9999aa';c.fillText(w,(N[a][0]+N[b][0])/2,(N[a][1]+N[b][1])/2-6);});
    N.forEach(([x,y],i)=>{c.fillStyle=found.has(i)?'#ffcc00':'#0f0f23';c.strokeStyle=i===target?'#00cc66':'#ffcc00';c.lineWidth=2;
      c.beginPath();c.arc(x,y,16,0,7);c.fill();c.stroke();c.fillStyle=found.has(i)?'#050509':'#fff';c.fillText(i,x-4,y+5);});}
  cv.addEventListener('pointerdown',e=>{const r=cv.getBoundingClientRect(),s=640/r.width,x=(e.clientX-r.left)*s,y=(e.clientY-r.top)*s;
    N.forEach(([nx,ny],i)=>{if(i&&Math.hypot(nx-x,ny-y)<22)target=i;});found.clear();path=[];out.textContent='';draw();});
  btn.addEventListener('click',async()=>{
    const d=N.map(()=>1e9),prev=[],pq=[[0,0]];d[0]=0;found.clear();path=[];
    const delay=matchMedia('(prefers-reduced-motion: reduce)').matches?0:450;
    while(pq.length){pq.sort((a,b)=>a[0]-b[0]);const[du,u]=pq.shift();if(du>d[u])continue;
      found.add(u);draw();await new Promise(r=>setTimeout(r,delay));
      if(u===target)break;
      for(const[v,w]of adj[u])if(du+w<d[v]){d[v]=du+w;prev[v]=u;pq.push([d[v],v]);}}
    for(let v=target;v!==undefined;v=prev[v])path.unshift(v);
    draw();out.textContent=`Shortest path: ${path.join(' → ')} (cost ${d[target]})`;});
  draw();
}
