(function(){
  const sec=document.getElementById('field'),line=sec&&sec.querySelector('.tideline');
  if(!line)return;
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');
  svg.setAttribute('class','tide-wave');svg.setAttribute('aria-hidden','true');
  const p1=document.createElementNS(ns,'path'),p2=document.createElementNS(ns,'path');
  p1.setAttribute('class','w1');p2.setAttribute('class','w2');svg.append(p2,p1);
  line.before(svg);
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let on=false,raf=0;
  function wave(w,h,amp,phase,len){let d='M0 '+(h/2);for(let x=0;x<=w;x+=6){d+=' L'+x+' '+(h/2+Math.sin(x/len+phase)*amp*(0.75+0.25*Math.sin(x/(len*3.1)+phase*.5))).toFixed(2);}return d;}
  function draw(){
    raf=0;const r=svg.getBoundingClientRect(),w=r.width,h=r.height,vh=innerHeight;
    const prog=Math.min(1,Math.max(0,(vh-r.top)/(vh+h)));
    const swell=reduce?0.5:Math.sin(prog*Math.PI);
    const amp=2+swell*(h/2-4),phase=reduce?0:scrollY*0.012;
    svg.setAttribute('viewBox','0 0 '+w+' '+h);
    p1.setAttribute('d',wave(w,h,amp,phase,46));
    p2.setAttribute('d',wave(w,h,amp*.6,phase+1.9,58));
  }
  const req=()=>{if(on&&!raf)raf=requestAnimationFrame(draw);};
  new IntersectionObserver(e=>{on=e[0].isIntersecting;req();}).observe(svg);
  addEventListener('scroll',req,{passive:true});addEventListener('resize',()=>{on=true;req();});
  on=true;draw();
})();
