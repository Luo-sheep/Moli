;(function(){
  function k(x){return 'pg_'+x}
  function get(x){try{return JSON.parse(localStorage.getItem(k(x))||'null')}catch(e){return null}}
  function set(x,v){localStorage.setItem(k(x),JSON.stringify(v))}
  function byId(id){return document.getElementById(id)}
  function applyTheme(){var theme=get('theme')||'dark';document.body.dataset.theme=theme}
  function toggleTheme(){var cur=get('theme')||'dark';var next=cur==='dark'?'light':'dark';set('theme',next);applyTheme()}
  function init(){applyTheme();var t=byId('theme-toggle');if(t)t.onclick=toggleTheme;var last=get('last_generated')||{};var intro=byId('intro');var topics=byId('topics');var sources=byId('sources');var text=(last.text||'');intro.textContent=text.split('\n\n')[0]||'';var tlines=(text.split('\n\n')[1]||'');topics.textContent=tlines||'';var src=get('last_sources')||[];sources.textContent=(src&&src.length)?src.join('\n'):'暂无来源';var copy=byId('copy-card');if(copy)copy.onclick=function(){var all=[intro.textContent,'',topics.textContent,(sources.textContent?('\n来源:\n'+sources.textContent):'')].join('\n');navigator.clipboard.writeText(all).then(function(){copy.textContent='已复制';setTimeout(function(){copy.textContent='复制内容'},1200)})}
    try{var sg=JSON.parse(localStorage.getItem('pg_slogan')||'"成就日常，清谈有趣"');var slots=document.querySelectorAll('.slogan');slots.forEach(function(el){el.textContent=sg})}catch(e){}
    var expHtml=byId('export-html');if(expHtml)expHtml.onclick=function(){var doc='<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>雏凤清音 · 分享卡片</title><style>body{font-family:Segoe UI,Roboto,Arial,sans-serif;padding:16px}h2{margin:16px 0 8px}pre{white-space:pre-wrap;border:1px solid #ddd;border-radius:8px;padding:12px}</style></head><body><h2>自我介绍</h2><pre>'+escapeHtml(intro.textContent)+'</pre><h2>话题引子</h2><pre>'+escapeHtml(topics.textContent)+'</pre><h2>来源引用</h2><pre>'+escapeHtml(sources.textContent)+'</pre></body></html>';download('雏凤清音_分享卡片.html',doc,'text/html')}
    var expPng=byId('export-png');if(expPng)expPng.onclick=function(){exportPNG(intro.textContent,topics.textContent,sources.textContent)}
    var expPdf=byId('export-pdf');if(expPdf)expPdf.onclick=function(){window.print()}
  }
  function download(name,content,mime){var blob=new Blob([content],{type:mime});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},100)}
  function escapeHtml(s){return (s||'').replace(/[&<>]/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]})}
  function exportPNG(intro,topics,sources){var canvas=document.createElement('canvas');var w=1024,h=768;canvas.width=w;canvas.height=h;var ctx=canvas.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,w,h);ctx.fillStyle='#111111';ctx.font='20px Segoe UI, Arial';var x=40,y=60,line=28;ctx.fillText('雏凤清音 · 分享卡片',x,y);y+=line*2;ctx.font='18px Segoe UI, Arial';ctx.fillText('自我介绍',x,y);y+=line;wrapText(ctx,intro||'',x,y,w-80,line);y+=line*2+Math.min(400,((intro||'').length/28|0)*line);
    ctx.fillText('话题引子',x,y);y+=line;wrapText(ctx,topics||'',x,y,w-80,line);y+=line*2+Math.min(400,((topics||'').length/28|0)*line);
    ctx.fillText('来源引用',x,y);y+=line;wrapText(ctx,sources||'',x,y,w-80,line);
    canvas.toBlob(function(blob){var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='雏凤清音_分享卡片.png';document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},100)},'image/png')}
  function wrapText(ctx,text,x,y,maxWidth,lineHeight){var words=(text||'').split(/\s+/);var line='';for(var n=0;n<words.length;n++){var testLine=line+words[n]+' ';var metrics=ctx.measureText(testLine);var testWidth=metrics.width;if(testWidth>maxWidth&&n>0){ctx.fillText(line,x,y);line=words[n]+' ';y+=lineHeight}else{line=testLine}}ctx.fillText(line,x,y)}
  document.addEventListener('DOMContentLoaded',init)
})();
