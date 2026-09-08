(() => {
    const state = JSON.parse(document.getElementById('editor-data').textContent);
    const editor = document.querySelector('[data-editor]');
    const status = document.querySelector('[data-save-status]');
    const saveButton = document.querySelector('[data-save]');
    let current = 'settings';
    let dirty = false;
    let uploading = 0;
    let editVersion = 0;
    const sections = {
        settings: ['站点设置', '管理品牌、网站简介和联系信息。', '保存后，前台刷新即可看到更新。'],
        slides: ['首页轮播', '管理海报、大图和视频，按列表顺序轮播。', '建议海报使用 1920×1080 以上横图。视频使用 MP4 / WebM，可上传单独的封面。'],
        games: ['游戏管理', '添加游戏卡片，上传 Web 游戏包或填写游戏地址。', '支持 HTML5、Cocos、Unity 和 Three.js 的 Web 导出。保存入口和封面、启用后即可展示。'],
        articles: ['安全科普', '发布基本常识、辨毒误区与应急知识。', '正文以空行分段。可填写参考来源名称和链接。'],
        ads: ['广告管理', '在首页、图鉴、游乐场或安全科普中发布广告。', '广告默认不启用；启用后明确标注“广告”。支持图片、介绍和跳转链接。']
    };
    const fields = {
        settings: [['name','网站名称'],['tagline','品牌副标题'],['description','网站简介 / 搜索引擎描述','textarea'],['public_url','前台完整地址'],['contact','合作联系方式'],['icp','ICP备案号'],['footer_note','页脚说明','textarea']],
        slides: [['id','内容标识'],['title','主标题','textarea'],['eyebrow','顶部小标题'],['subtitle','副标题','textarea'],['media_type','媒体类型','select',['image','video']],['url','图片 / 视频地址','media'],['poster','视频封面','media'],['link','按钮跳转链接'],['button','按钮文字'],['enabled','在首页展示','checkbox']],
        games: [['id','游戏标识'],['title','游戏名称'],['description','游戏介绍','textarea'],['cover','游戏封面','media'],['entry_url','游戏入口地址'],['engine','游戏引擎','select',['HTML5','Cocos','Unity','Three.js']],['category','游戏分类'],['mode','打开方式','select',['embed','new_tab']],['enabled','上架展示','checkbox']],
        articles: [['id','文章标识'],['title','文章标题'],['category','文章分类'],['summary','文章摘要','textarea'],['cover','文章封面','media'],['body','正文','long'],['source_name','参考来源名称'],['source_url','参考来源链接'],['enabled','发布文章','checkbox']],
        ads: [['id','广告标识'],['title','广告标题'],['description','广告介绍','textarea'],['image','广告图片','media'],['link','广告跳转链接'],['placement','投放页面','select',['home','gallery','games','safety']],['enabled','启用广告','checkbox']]
    };
    const optionLabels = {image:'图片',video:'视频',embed:'页面内游玩',new_tab:'新窗口游玩',home:'首页',gallery:'菌子图鉴',games:'游乐场',safety:'安全科普'};
    const newItems = {
        slides: {id:'',title:'新的林间故事',subtitle:'',eyebrow:'FIELD NOTES / 菌野观察',media_type:'image',url:'',poster:'',link:'/mushrooms',button:'开启探索',enabled:false},
        games: {id:'',title:'新的菌子游戏',description:'',cover:'',entry_url:'',engine:'HTML5',category:'益智',mode:'embed',enabled:false},
        articles: {id:'',title:'新的科普文章',category:'基本常识',summary:'',body:'请填写科普正文。',cover:'',source_name:'',source_url:'',enabled:false},
        ads: {id:'',title:'新的广告',description:'',image:'',link:'',placement:'home',enabled:false}
    };
    function node(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }
    function feedback(message, error = false) {
        status.textContent = message;
        status.classList.toggle('error', error);
    }
    function markDirty() { dirty = true; editVersion += 1; feedback('有未保存的修改，点击“保存并生效”发布。'); }
    function fieldControl(item, definition, index) {
        const [key, labelText, type = 'text', options] = definition;
        const label = node('label', ['textarea','long','media'].includes(type) ? 'wide' : '');
        label.append(node('span', '', labelText));
        let control;
        if (type === 'select') {
            control = node('select');
            options.forEach(value => { const option = node('option','', optionLabels[value] || value); option.value = value; control.append(option); });
        } else if (type === 'textarea' || type === 'long') control = node('textarea', type === 'long' ? 'long' : '');
        else { control = node('input'); control.type = type === 'checkbox' ? 'checkbox' : 'text'; }
        control.name = `${current}.${index}.${key}`;
        if (type === 'checkbox') { control.checked = item[key]; label.className = 'checkbox'; }
        else control.value = item[key] || '';
        if (key === 'id') { control.pattern = '[a-z0-9][a-z0-9-]{0,59}'; control.required = true; }
        if (['title','name','body'].includes(key)) control.required = true;
        if (['url','entry_url'].includes(key) && item.enabled) control.required = true;
        control.addEventListener('input', () => { item[key] = type === 'checkbox' ? control.checked : control.value; markDirty(); });
        if (type === 'media') label.append(mediaControl(item, key, control));
        else label.append(control);
        if (key === 'id') label.append(node('span','field-note','小写英文字母、数字和短横线；同一栏目内不可重复。'));
        return label;
    }
    function mediaControl(item, key, control) {
        const wrap = node('div','media-field');
        const file = node('input'); file.type = 'file'; file.accept = 'image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm'; file.hidden = true;
        const button = node('button','','上传素材'); button.type = 'button';
        button.addEventListener('click', event => { event.preventDefault(); file.click(); });
        file.addEventListener('change', async () => {
            if (!file.files.length) return;
            const data = new FormData(); data.append('file', file.files[0]);
            const response = await upload('/admin/api/media', data, button);
            if (response) { item[key] = response.url; control.value = response.url; markDirty(); }
        });
        wrap.append(control, button, file);
        return wrap;
    }
    function packageControl(item) {
        const wrap = node('div','upload-game');
        wrap.append(node('p','','上传包含 index.html 的 ZIP 包（最大 150MB，解压后最大 600MB）。每次上传请使用新的游戏标识。Unity 建议关闭线程并启用 Decompression Fallback，或使用未压缩 Web 导出。'));
        const file = node('input'); file.type = 'file'; file.accept = '.zip'; file.hidden = true;
        const button = node('button','','上传 Web 游戏 ZIP'); button.type = 'button';
        button.addEventListener('click', () => { if (!/^[a-z0-9][a-z0-9-]{0,59}$/.test(item.id)) { feedback('请先填写有效的游戏标识。', true); return; } file.click(); });
        file.addEventListener('change', async () => {
            if (!file.files.length) return;
            const data = new FormData(); data.append('slug', item.id); data.append('file', file.files[0]);
            const response = await upload('/admin/api/game-package', data, button);
            if (response) { item.entry_url = response.entry_url; markDirty(); render(); feedback('游戏包已上传，点击“保存并生效”发布卡片。'); }
        });
        wrap.append(button, file);
        return wrap;
    }
    async function upload(url, body, button) {
        uploading += 1; button.disabled = true; button.textContent = '上传中…'; saveButton.disabled = true;
        try { const response = await fetch(url, {method:'POST', body}); const result = await response.json(); if (!response.ok) throw new Error(formatError(result)); return result; }
        catch(error) { feedback(`上传失败：${error.message}`, true); return null; }
        finally { uploading -= 1; button.disabled = false; button.textContent = '重新上传'; saveButton.disabled = uploading > 0; }
    }
    function actions(index) {
        const wrap = node('div','cms-panel-actions');
        [['↑',-1],['↓',1],['移除',0]].forEach(([label, direction]) => {
            const button = node('button',direction ? '' : 'remove',label); button.type = 'button';
            button.setAttribute('aria-label', `${label}第 ${index + 1} 项`);
            button.disabled = direction === -1 && index === 0 || direction === 1 && index === state.content[current].length - 1;
            button.addEventListener('click', () => {
                const list = state.content[current];
                if (!direction) list.splice(index,1);
                else [list[index], list[index+direction]] = [list[index+direction], list[index]];
                markDirty(); render();
            });
            wrap.append(button);
        });
        return wrap;
    }
    function render() {
        document.querySelector('[data-section-title]').textContent = sections[current][0];
        document.querySelector('[data-section-description]').textContent = sections[current][1];
        document.querySelector('[data-section-help]').textContent = sections[current][2];
        document.querySelector('[data-add]').hidden = current === 'settings';
        document.querySelectorAll('[data-section]').forEach(button => button.classList.toggle('selected', button.dataset.section === current));
        document.querySelectorAll('[data-count]').forEach(count => count.textContent = state.content[count.dataset.count].length);
        editor.replaceChildren();
        const items = current === 'settings' ? [state.content.settings] : state.content[current];
        items.forEach((item,index) => {
            const panel = node('section','cms-panel');
            const heading = node('div','cms-panel-head'); heading.append(node('h2','', current === 'settings' ? '品牌与基本信息' : `${String(index+1).padStart(2,'0')} · ${item.title}`));
            if (current !== 'settings') heading.append(actions(index));
            const grid = node('div','cms-grid'); fields[current].forEach(definition => grid.append(fieldControl(item,definition,index)));
            panel.append(heading,grid); if (current === 'games') panel.append(packageControl(item)); editor.append(panel);
        });
        if (!items.length) editor.append(node('div','cms-empty','这里还没有内容。点击“新增内容”创建第一项。'));
    }
    function formatError(result) {
        if (!Array.isArray(result.detail)) return result.detail || '操作失败，请重试';
        return result.detail.map(error => `${error.loc.slice(1).join(' / ')}：${error.msg}`).join('；');
    }
    document.querySelectorAll('[data-section]').forEach(button => button.addEventListener('click', () => { current = button.dataset.section; render(); window.scrollTo({top:0}); }));
    document.querySelector('[data-add]').addEventListener('click', () => { const item = structuredClone(newItems[current]); item.id = `${current}-${Date.now().toString(36)}`; state.content[current].push(item); markDirty(); render(); editor.lastElementChild.scrollIntoView({behavior:'smooth',block:'center'}); });
    editor.addEventListener('submit', event => event.preventDefault());
    saveButton.addEventListener('click', async () => {
        if (!editor.reportValidity()) return;
        saveButton.disabled = true; feedback('正在保存…');
        const savingVersion = editVersion;
        try {
            const response = await fetch('/admin/api/content',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(state)});
            const result = await response.json(); if (!response.ok) throw new Error(formatError(result));
            state.revision = result.revision; dirty = savingVersion !== editVersion;
            feedback(dirty ? '已保存提交的内容；保存期间的新修改请再次保存。' : '保存成功。前台刷新即可看到更新。');
            document.querySelector('[data-preview]').href = state.content.settings.public_url;
        } catch(error) { feedback(`保存失败：${error.message}`,true); }
        finally { saveButton.disabled = false; }
    });
    document.querySelector('[data-export]').addEventListener('click', () => { const url = URL.createObjectURL(new Blob([JSON.stringify(state.content,null,2)],{type:'application/json'})); const anchor = node('a'); anchor.href=url; anchor.download='mushroom-site.json'; anchor.click(); setTimeout(() => URL.revokeObjectURL(url),1000); });
    window.addEventListener('beforeunload', event => { if(dirty || uploading) { event.preventDefault(); event.returnValue=''; } });
    render();
})();
