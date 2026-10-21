(function(){var r=document.documentElement,m=matchMedia('(prefers-color-scheme:dark)');
function sync(){r.dataset.mode=r.dataset.theme||(m.matches?'dark':'light')}
sync();if(m.addEventListener)m.addEventListener('change',sync);
new MutationObserver(sync).observe(r,{attributes:true,attributeFilter:['data-theme']});})();
