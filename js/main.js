(function(){
var $=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};

/* Formulário -> WhatsApp */
$('#f').addEventListener('submit',function(e){
  e.preventDefault();
  var d=new FormData(e.target);
  var t='Olá, sou '+d.get('nome')+'. Local: '+d.get('local')+'. Tenho interesse em: '+d.get('servico')+'. '+(d.get('msg')||'');
  window.open('https://wa.me/5541992641946?text='+encodeURIComponent(t),'_blank','noopener');
});

/* Cabeçalho, progresso e botão flutuante */
var h=$('header'),p=$('#prog'),fab=$('.fab');
function onS(){var y=window.scrollY,m=document.documentElement.scrollHeight-window.innerHeight;h.classList.toggle('sc',y>10);p.style.transform='scaleX('+(m>0?y/m:0)+')';fab.classList.toggle('show',y>400)}
addEventListener('scroll',onS,{passive:true});onS();

/* Item ativo do menu */
var links=$$('#nav a'),secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
function spy(){var cur=-1;secs.forEach(function(s,i){if(s.getBoundingClientRect().top<=120)cur=i});if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)cur=secs.length-1;links.forEach(function(a,i){a.classList.toggle('act',i===cur);if(i===cur)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')})}
addEventListener('scroll',spy,{passive:true});spy();

/* Menu mobile */
var nav=$('#nav'),mb=$('.menu');
function closeNav(){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}
mb.addEventListener('click',function(){mb.setAttribute('aria-expanded',nav.classList.toggle('open'))});
nav.addEventListener('click',closeNav);
document.addEventListener('click',function(e){if(nav.classList.contains('open')&&!e.target.closest('header'))closeNav()});
addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){closeNav();mb.focus()}});

/* Tema */
var root=document.documentElement;
$('#theme').addEventListener('click',function(){root.dataset.theme=root.dataset.theme==='dark'?'light':'dark'});

/* Animação de entrada: escalonada por lote (quem entra junto aparece em sequência) */
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
 var io=new IntersectionObserver(function(es){var n=0;es.forEach(function(en){if(en.isIntersecting){var el=en.target;el.style.setProperty('--d',Math.min(n++,4)*100+'ms');el.classList.add('in');io.unobserve(el)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 $$('.svc,.card,form,details,.trust ul').forEach(function(el){el.classList.add('reveal');io.observe(el)});
}

/* Passo a passo: aparece 1, depois 2, depois 3 */
var stp=$('.steps');
if(stp&&'IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
 var sl=Array.prototype.slice.call(stp.querySelectorAll('.step'));
 stp.classList.add('seq');
 var so=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){so.disconnect();sl.forEach(function(el,i){setTimeout(function(){el.classList.add('show')},i*1100)})}})},{threshold:.15});
 so.observe(stp);
}

/* Diferenciais: aparecem um de cada vez */
var why=$('.why');
if(why&&'IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
 var wl=Array.prototype.slice.call(why.children);
 why.classList.add('seq');
 var wo=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){wo.disconnect();wl.forEach(function(el,i){setTimeout(function(){el.classList.add('show')},i*900)})}})},{threshold:.15});
 wo.observe(why);
}

/* Câmera que acompanha o ponteiro (desktop) ou "vigia" sozinha (celular) */
var eye=$('#eye'),cam=$('.cam'),mob=matchMedia('(max-width:860px),(hover:none)'),calm=matchMedia('(prefers-reduced-motion:reduce)').matches,aimT;
var cx=0,cy=0,tx=0,ty=0,raf=0;
function tick(){cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;eye.style.transform='translate('+cx.toFixed(2)+'px,'+cy.toFixed(2)+'px)';raf=Math.abs(tx-cx)>.05||Math.abs(ty-cy)>.05?requestAnimationFrame(tick):0}
addEventListener('pointermove',function(e){if(mob.matches)return;var r=cam.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy)||1,k=Math.min(d,300)/300*20;tx=dx/d*k;ty=dy/d*k;if(!raf)raf=requestAnimationFrame(tick)});
function rnd(){clearTimeout(aimT);if(!mob.matches||calm)return;if(!document.hidden){var a=Math.random()*6.2832,k=(.35+Math.random()*.65)*20;eye.style.transform='translate('+(Math.cos(a)*k).toFixed(1)+'px,'+(Math.sin(a)*k).toFixed(1)+'px)'}aimT=setTimeout(rnd,900+Math.random()*1400)}
function mode(){eye.style.transition=mob.matches?'transform .55s cubic-bezier(.22,1,.36,1)':'none';cancelAnimationFrame(raf);raf=0;cx=cy=tx=ty=0;eye.style.transform='';rnd()}
if(mob.addEventListener)mob.addEventListener('change',mode);else mob.addListener(mode);
mode();

/* Botões "Pedir orçamento" dos cards pré-selecionam o serviço no formulário */
$$('.svc .go[data-s]').forEach(function(a){a.addEventListener('click',function(){document.querySelector('select[name=servico]').value=a.dataset.s})});

/* FAQ com abertura suave */
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fs=$$('details');
function anim(d,f,t,done){d.style.overflow='hidden';var a=d.animate([{height:f+'px'},{height:t+'px'}],{duration:300,easing:'ease'});a.onfinish=function(){d.style.overflow='';if(done)done()}}
function openD(d){var f=d.offsetHeight;d.open=true;if(!rm)anim(d,f,d.offsetHeight)}
function closeD(d){var f=d.offsetHeight,t=d.querySelector('summary').offsetHeight+2;if(rm){d.open=false;return}anim(d,f,t,function(){d.open=false})}
fs.forEach(function(d){d.querySelector('summary').addEventListener('click',function(e){e.preventDefault();if(d.open){closeD(d)}else{fs.forEach(function(o){if(o!==d&&o.open)closeD(o)});openD(d)}})});
})();
