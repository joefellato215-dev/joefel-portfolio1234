import './styles.css';
import {projects,statusLabel} from './data/projects.js';
import {initGraph} from './components/dijkstra.js';
const $=(s,r=document)=>r.querySelector(s);
const el=(t,txt,cls)=>{const e=document.createElement(t);if(txt)e.textContent=txt;if(cls)e.className=cls;return e;};
$('#yr').textContent=new Date().getFullYear();
// Project cards: textContent only, no HTML injection.
const grid=$('#project-grid');
projects.forEach(p=>{const a=el('article',null,'card');
  a.append(el('span',statusLabel[p.status],'badge'),el('h3',p.name),el('p',p.cat,'cat'),el('p',p.desc));
  const ul=el('ul');p.features.forEach(f=>ul.append(el('li',f)));
  const tg=el('p',p.tech.join(' · '),'tech');
  const l=el('a','GitHub','btn');l.href=p.github;l.rel='noopener';
  a.append(ul,tg,l);grid.append(a);});
initGraph($('#graph'),$('#run-path'),$('#path-out'));
// Mobile menu
const burger=$('.burger'),menu=$('#menu');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);});
menu.addEventListener('click',()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false);});
// Active section highlight
const links=[...menu.querySelectorAll('a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.hash==='#'+e.target.id));}),{rootMargin:'-45% 0px -50%'});
document.querySelectorAll('main section').forEach(s=>io.observe(s));
// Form validation (client-side only; opens the visitor's mail app once an email is set).
$('#form').addEventListener('submit',e=>{e.preventDefault();const f=e.target,m=$('#form-msg');
  if(!f.checkValidity()){m.textContent='Please fill in your name, a valid email, and a message of at least 10 characters.';return;}
  m.textContent='Looks good. Add your email address in main.js to enable sending.';});
// 3D loads lazily so first paint is fast.
import('./scenes/hero.js').then(m=>m.initHero($('#scene')));
