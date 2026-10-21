(function(){var r=document.documentElement,tc=document.querySelector('meta[name="theme-color"]');
function sync(){var m=r.dataset.theme==='dark'?'dark':'light';r.dataset.mode=m;if(tc)tc.content=m==='dark'?'#111923':'#FFFFFF'}
sync();
new MutationObserver(sync).observe(r,{attributes:true,attributeFilter:['data-theme']});})();
