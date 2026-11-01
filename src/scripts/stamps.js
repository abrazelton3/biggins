(function(){
  const ns='http://www.w3.org/2000/svg';
  const defs=document.createElementNS(ns,'svg');
  defs.setAttribute('width','0');defs.setAttribute('height','0');defs.setAttribute('aria-hidden','true');defs.style.position='absolute';
  defs.innerHTML='<filter id="ts-ink" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" result="d"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -2.6 2.1" result="m"/><feComposite in="d" in2="m" operator="in"/></filter>';
  document.body.prepend(defs);
  const t=(x,y,s,txt,o)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-size="'+s+'"'+(o||'')+'>'+txt+'</text>';
  const shapes={
    circle(d,id,L){return '<svg viewBox="0 0 130 130" aria-hidden="true"><defs><path id="'+id+'" d="M65,65 m-51,0 a51,51 0 1,1 102,0 a51,51 0 1,1 -102,0"/></defs>'+
      '<circle cx="65" cy="65" r="62" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="65" cy="65" r="40" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<text font-size="10.5" font-weight="500"><textPath href="#'+id+'" textLength="316" lengthAdjust="spacing">'+d.ring+'</textPath></text>'+
      t(65,52,8.5,L[0]||'',' letter-spacing="1"')+t(65,72,15,L[1]||'',' font-weight="500"')+t(65,86,8.5,L[2]||'',' letter-spacing="1"')+'</svg>';},
    oval(d,id,L){return '<svg viewBox="0 0 180 110" aria-hidden="true"><defs><path id="'+id+'" d="M90,55 m-74,0 a74,40 0 1,1 148,0 a74,40 0 1,1 -148,0"/></defs>'+
      '<ellipse cx="90" cy="55" rx="86" ry="51" fill="none" stroke="currentColor" stroke-width="3"/><ellipse cx="90" cy="55" rx="60" ry="29" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<text font-size="9.5" font-weight="500"><textPath href="#'+id+'" textLength="370" lengthAdjust="spacing">'+d.ring+'</textPath></text>'+
      t(90,50,9,L[0]||'',' letter-spacing="1.5"')+'<rect x="58" y="56" width="64" height="17" fill="none" stroke="currentColor" stroke-width="1.2"/>'+t(90,69,12,L[1]||'',' font-weight="500" letter-spacing="1"')+'</svg>';},
    rect(d,id,L){return '<svg viewBox="0 0 190 104" aria-hidden="true"><rect x="2" y="2" width="186" height="100" fill="none" stroke="currentColor" stroke-width="3"/><rect x="8" y="8" width="174" height="88" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      t(95,27,13,L[0]||'',' font-weight="500" letter-spacing="2.5"')+t(95,41,8.5,L[1]||'',' letter-spacing="1.2"')+'<line x1="22" y1="48" x2="168" y2="48" stroke="currentColor" stroke-width="1"/>'+
      '<text x="95" y="74" text-anchor="middle" font-size="24" class="hand">'+(L[2]||'')+'</text>'+t(95,89,8,L[3]||'',' letter-spacing="1.5"')+'</svg>';}
  };
  document.querySelectorAll('.tstamp').forEach((el,i)=>{
    const d=el.dataset,L=(d.lines||'').split('|');
    el.setAttribute('aria-label',d.tip);
    el.innerHTML=(shapes[d.shape]||shapes.circle)(d,'tsr'+i,L)+'<span class="ts-tip">'+d.tip+' →</span>';
  });
})();
