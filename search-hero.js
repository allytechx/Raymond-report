// Hero search with inline autocomplete
(function(){
  function initSearch(inputId, dropdownId){
    var input=document.getElementById(inputId);
    var dd=document.getElementById(dropdownId);
    if(!input||!dd) return;
    input.addEventListener('input',function(){
      var q=input.value.trim().toLowerCase();
      if(!q){dd.style.display='none';dd.innerHTML='';return;}
      var terms=q.split(/\s+/);
      var scored=INDEX.map(function(item){
        var text=(item.title+' '+item.meta+' '+item.keywords).toLowerCase();
        var score=0;
        terms.forEach(function(t){
          if(text.indexOf(t)>=0) score+=10;
          if(item.title.toLowerCase().indexOf(t)>=0) score+=5;
        });
        return{item:item,score:score};
      }).filter(function(x){return x.score>0;}).sort(function(a,b){return b.score-a.score;}).slice(0,15);
      if(!scored.length){dd.style.display='none';dd.innerHTML='';return;}
      var html='';
      var curType='';
      scored.forEach(function(x){
        if(x.item.type!==curType){
          curType=x.item.type;
          html+='<div style="padding:8px 16px 4px;font-size:12px;color:#86868b;font-weight:600;text-transform:uppercase;">'+curType+'</div>';
        }
        html+='<a href="'+x.item.page+'" style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;color:#f5f5f7;text-decoration:none;border-bottom:1px solid #1d1d1f;"><span><span style="font-weight:600;font-size:15px;">'+x.item.title+'</span><br><span style="font-size:13px;color:#86868b;">'+x.item.meta+'</span></span><span style="color:#2997ff;font-size:13px;">→</span></a>';
      });
      dd.innerHTML=html;
      dd.style.display='block';
    });
    input.addEventListener('keydown',function(e){
      if(e.key==='Enter'){window.location.href='search.html?q='+encodeURIComponent(input.value);}
    });
    document.addEventListener('click',function(e){
      if(!dd.contains(e.target)&&e.target!==input){dd.style.display='none';}
    });
  }
  window.initHeroSearch=initSearch;
})();
