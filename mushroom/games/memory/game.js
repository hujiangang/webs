(() => {
    const board = document.querySelector('[data-board]');
    const message = document.querySelector('[data-message]');
    const colors = ['#c48652','#be634c','#8c9b50','#e4bc69','#b48d9f','#7d9d85'];
    let selected = [];
    let pairs = 0;
    let moves = 0;
    let locked = false;
    let pending;
    function shuffle(items) {
        for(let index=items.length-1; index>0; index-=1) {
            const target = Math.floor(Math.random() * (index+1));
            [items[index],items[target]] = [items[target],items[index]];
        }
        return items;
    }
    function mushroom(color) {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="140" viewBox="0 0 120 140"><ellipse cx="60" cy="127" rx="30" ry="5" fill="#dce5c4"/><path d="M46 65v51q14 15 28 0V65" fill="#ded7b4"/><path d="M12 70C12 1 108 1 108 70Z" fill="${color}"/><ellipse cx="38" cy="49" rx="9" ry="6" fill="#fff5d5"/><ellipse cx="70" cy="32" rx="8" ry="5" fill="#fff5d5"/><ellipse cx="86" cy="56" rx="7" ry="5" fill="#fff5d5"/></svg>`;
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    }
    function reveal(card, key) {
        const image = document.createElement('img'); image.src = mushroom(colors[key]); image.alt = `第${key+1}种菌子图案`;
        card.replaceChildren(image); card.classList.add('revealed'); card.setAttribute('aria-label',`已翻开：第${key+1}种菌子`);
    }
    function conceal(card) {
        const mark = document.createElement('span'); mark.className='back-mark'; mark.textContent='f'; mark.setAttribute('aria-hidden','true');
        card.replaceChildren(mark); card.classList.remove('revealed'); card.setAttribute('aria-label',`翻开第${Number(card.dataset.position)+1}张卡片`);
    }
    function choose(card, key) {
        if(locked || card.classList.contains('matched') || selected.some(item=>item.card===card)) return;
        reveal(card,key); selected.push({card,key});
        if(selected.length<2) return;
        moves+=1; document.querySelector('[data-moves]').textContent=moves;
        const [first,second]=selected;
        if(first.key===second.key) {
            selected.forEach(item=>{item.card.classList.add('matched');item.card.disabled=true;});
            pairs+=1; selected=[]; document.querySelector('[data-pairs]').textContent=pairs;
            message.textContent=pairs===6?`全部找到了！你用了 ${moves} 次翻牌配对，森林为你的细心鼓掌。`:'找到一对，继续探索吧！';
        } else {
            locked=true; message.textContent='记住它们的位置，再试一次。';
            pending=setTimeout(()=>{selected.forEach(item=>conceal(item.card));selected=[];locked=false;},850);
        }
    }
    function restart() {
        clearTimeout(pending); selected=[]; pairs=0; moves=0; locked=false; board.replaceChildren();
        document.querySelector('[data-pairs]').textContent='0';document.querySelector('[data-moves]').textContent='0';message.textContent='从任意一张卡开始吧。';
        shuffle([...colors.keys(),...colors.keys()]).forEach((key,index)=>{const card=document.createElement('button');card.type='button';card.className='card';card.dataset.position=index;conceal(card);card.addEventListener('click',()=>choose(card,key));board.append(card);});
    }
    document.querySelector('[data-restart]').addEventListener('click',restart);
    restart();
})();
