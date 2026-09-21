// Hero search with inline autocomplete + product thumbnails
(function(){
  // Product image mapping for key products we have photos for
  var PRODUCT_IMGS = {
    "VOOPOO ARGUS G4": "https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/LLGBbSPTTo38x8xbi2gcqFwVnjP",
    "GEEKVAPE KLOUD": "https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/Q2z2bra7xoG2N2xfZIZcyBksnDg",
    "SMOK S2 Nord": "https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/PgyObtoPXodr1fx5i6Rc0Fetncn",
    "UWELL Caliburn G3": "https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/KImCb75hkokAWNxezGAcF3ZBn5f",
    "DOJO BLAST X": "https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/JRVubWoibo3GN4xdPHZc91gdnFb",
    "Mevol S7000": "https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/AwGmbav1HoPo2LxRxSQcS7iSnVd",
    "PIXL Max 20K": "https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/LkWlb21rSoQ8mcxpbcAc9nMTnUc",
    "OXVA XLIM Pro": "https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/EYCMblmvnoOpaKxrlZQcBFLJnkg",
    "LVL PWR GO": "https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/TKoCbRhsYoAijUx4Kdtcft72ned",
    "ELFBAR ELFA": "https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/BMddb4HO3o7owVx7kNQcSQ07nne",
    "ELFBAR ELFX PRO": "https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/Pymqb49XnoI1dhxp1XTc0zfRnJh",
    "FUMOT Royal 15000": "https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/Z9TSbiSuzo0RDIxXFyTcjTFqnvc"
  };

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
      if(!scored.length){
        // No internal results - show Google search link
        dd.innerHTML='<a href="https://www.google.com/search?q='+encodeURIComponent(input.value)+'" target="_blank" style="display:flex;align-items:center;padding:14px 16px;color:#2997ff;text-decoration:none;font-size:14px;">&#128269; 在 Google 搜索 "'+input.value+'"</a>';
        dd.style.display='block';
        return;
      }
      var html='';
      var curType='';
      scored.forEach(function(x){
        if(x.item.type!==curType){
          curType=x.item.type;
          html+='<div style="padding:8px 16px 4px;font-size:12px;color:#86868b;font-weight:600;text-transform:uppercase;">'+curType+'</div>';
        }
        var img=PRODUCT_IMGS[x.item.title];
        var imgHtml='';
        if(img){
          imgHtml='<img src="'+img+'" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0;margin-right:12px;background:#1c1c1e" loading="lazy">';
        }
        html+='<a href="'+x.item.page+'" style="display:flex;align-items:center;padding:10px 16px;color:#f5f5f7;text-decoration:none;border-bottom:1px solid #1d1d1f;">'+imgHtml+'<span style="flex:1"><span style="font-weight:600;font-size:15px;">'+x.item.title+'</span><br><span style="font-size:13px;color:#86868b;">'+x.item.meta+'</span></span><span style="color:#2997ff;font-size:13px;margin-left:8px;">→</span></a>';
      });
      // Add Google search link at bottom
      html+='<a href="https://www.google.com/search?q='+encodeURIComponent(input.value)+'" target="_blank" style="display:flex;align-items:center;padding:12px 16px;color:#2997ff;text-decoration:none;border-top:1px solid #2c2c2e;font-size:14px;">&#128269; 在 Google 搜索 "'+input.value+'"</a>';
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
