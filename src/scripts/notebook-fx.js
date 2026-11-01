// Polaroid "turn over" — the back of each essay snap shows its first line.
// The line comes from the essay's body in Sanity (EssayCard's data-first-line),
// so new essays get a back automatically; essays without a body stay one-sided.
(function(){
  document.querySelectorAll('.snaps .snap').forEach(snap=>{
    const img=snap.querySelector('.img'),txt=snap.dataset.firstLine;
    if(!img||!txt)return;
    const date=(snap.querySelector('.meta span:last-child')||{}).textContent||'';
    const flip=document.createElement('div');flip.className='flip';
    const inner=document.createElement('div');inner.className='flip-inner';
    const back=document.createElement('div');back.className='back';
    back.innerHTML='<span class="bh"><span class="bl">First line</span><span class="bd"></span></span><q></q>';
    back.querySelector('q').textContent=txt.replace(/^“|”$/g,'');
    back.querySelector('.bd').textContent=date?'— '+date:'';
    img.replaceWith(flip);inner.append(img,back);flip.append(inner);
    const turn=document.createElement('span');turn.className='turn';turn.textContent='turn over ↻';turn.setAttribute('aria-hidden','true');
    flip.append(turn);
    turn.addEventListener('mouseenter',()=>flip.classList.add('on'));
    flip.addEventListener('mouseleave',()=>flip.classList.remove('on'));
    turn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();flip.classList.toggle('on');turn.textContent=flip.classList.contains('on')?'turn back ↺':'turn over ↻';});
  });
})();
