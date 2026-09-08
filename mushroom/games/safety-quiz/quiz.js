(() => {
    const questions = [
        {text:'颜色朴素的野生菌，也可能含有致命毒素。',answer:true,reason:'颜色不能作为辨毒依据。外观相似的菌子可能具有完全不同的毒性。'},
        {text:'虫子吃过的菌子，人也可以放心食用。',answer:false,reason:'不同生物对毒素的敏感性不同，虫咬痕迹不能证明对人安全。'},
        {text:'把野生菌煮熟，就可以消除所有毒素。',answer:false,reason:'部分蘑菇毒素耐热，普通烹调无法可靠去除。煮熟不等于安全。'},
        {text:'仅凭一张照片，不能可靠判断采集的野生菌能否食用。',answer:true,reason:'鉴定可能需要多角度形态、生境甚至显微或分子信息，照片不是食用许可。'},
        {text:'食用后出现不适，应及时就医并说明野生菌食用史。',answer:true,reason:'尽快就医或拨打 120，在不耽误就医的前提下保留剩余菌子或食物。'},
        {text:'用银器或大蒜与菌子一起煮，可以可靠试毒。',answer:false,reason:'这些民间辨毒方法没有可靠科学依据，不能用于采食判断。'},
        {text:'中毒症状暂时减轻，就说明已经没有危险。',answer:false,reason:'某些中毒可能延迟出现症状，或出现暂时缓解。是否脱离危险应由医务人员判断。'},
        {text:'不采、不买、不吃不认识或来源不明的野生菌，是重要的安全原则。',answer:true,reason:'保持好奇，也保持敬畏。学习图鉴有助于观察，不能代替专业鉴定。'}
    ];
    let index=0;let score=0;let answered=false;
    const feedback=document.querySelector('[data-feedback]');
    const next=document.querySelector('[data-next]');
    const buttons=[...document.querySelectorAll('[data-answer]')];
    function show() {
        answered=false;feedback.textContent='';feedback.classList.remove('wrong');next.hidden=true;
        document.querySelector('[data-progress]').textContent=`第 ${index+1} / ${questions.length} 题`;
        document.querySelector('[data-track]').style.width=`${(index+1)/questions.length*100}%`;
        document.querySelector('[data-question]').textContent=questions[index].text;
        document.querySelector('[data-score]').textContent=`答对 ${score} 题`;
        buttons.forEach(button=>button.disabled=false);
    }
    buttons.forEach(button=>button.addEventListener('click',()=>{
        if(answered)return;answered=true;
        const correct=(button.dataset.answer==='true')===questions[index].answer;
        if(correct)score+=1;
        feedback.textContent=`${correct?'答对了。':'再记住这个知识点：'}${questions[index].reason}`;
        feedback.classList.toggle('wrong',!correct);buttons.forEach(item=>item.disabled=true);
        document.querySelector('[data-score]').textContent=`答对 ${score} 题`;
        next.textContent=index===questions.length-1?'查看成绩 →':'下一题 →';next.hidden=false;
    }));
    next.addEventListener('click',()=>{
        if(!answered)return;
        if(index===questions.length-1){document.querySelector('[data-panel]').hidden=true;document.querySelector('[data-result]').hidden=false;document.querySelector('[data-result-title]').textContent=`答对 ${score} / ${questions.length} 题`;}else{index+=1;show();}
    });
    document.querySelector('[data-restart]').addEventListener('click',()=>{index=0;score=0;document.querySelector('[data-panel]').hidden=false;document.querySelector('[data-result]').hidden=true;show();});
    show();
})();
