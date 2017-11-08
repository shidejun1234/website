// JavaScript Document

window.onload=function (){
	mv.app.toTip();
	mv.app.toBanner();
	mv.app.toSel();
	mv.app.run();
};
var mv={};
mv.tool={};
mv.tool.getByClass=function (oParent,sClass){
	var aEl=oParent.getElementsByTagName('*');
	var arr=[];
	for(var i=0;i<aEl.length;i++){
		if(aEl[i].className==sClass){
			arr.push(aEl[i]);	
		}	
		
	}
	return arr;
};
mv.tool.getByStyle=function (obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];//IE	
	}else{
		return getComputedStyle(obj,false)[attr];	
	}
};

mv.ui={};
mv.ui.changeText=function (obj,str){
	obj.onfocus=function (){
		if(this.value==str){
			this.value='';	
		}	
	};
	
	obj.onblur=function (){
		if(this.value==''){
			this.value=str;	
		}	
	};
	
};
mv.ui.fadeIn=function(obj){
	var aCur=mv.tool.getByStyle(obj,'opacity');
	if(aCur==1){
		//alert(1);
		return 0;	
	}
	var value=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var iSpeed=5;
		if(value==100){
			clearInterval(obj.timer);
		}else{
			value+=iSpeed;
			obj.style.opacity=value/100;
			obj.style.filter='alpha(opacity="+value+")';	
		}
			
	},30);	
};
mv.ui.fadeOut=function(obj){
	var aCur=mv.tool.getByStyle(obj,'opacity');
	if(aCur==0){
		//alert(1);
		return 0;	
	}
	var value=100;
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var iSpeed=-5;
		if(value==0){
			clearInterval(obj.timer);
		}else{
			value+=iSpeed;
			obj.style.opacity=value/100;
			obj.style.filter='alpha(opacity="+value+")';	
		}
			
	},30);		
};
mv.ui.moveleft=function (obj,old,now){
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var iSpeed=(now-old)/10;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		if(old==now){
			clearInterval(obj.timer);
		}else{
			old+=iSpeed;
			obj.style.left=old+'px';	
		}
			
	},30);
};


mv.app={};
mv.app.toTip=function (){
	var oText1=document.getElementById("text1");
	var oText2=document.getElementById("text2");
	
	mv.ui.changeText(oText1,'Search website');
	mv.ui.changeText(oText2,'Search website');	
};

mv.app.toBanner=function (){
	var oAd=document.getElementById("ad");
	var aLi=oAd.getElementsByTagName("li");
	var aPrevBg=mv.tool.getByClass(oAd,'prev_bg')[0];
	var aNextBg=mv.tool.getByClass(oAd,'next_bg')[0];
	var aPrev=mv.tool.getByClass(oAd,'prev')[0];
	var aNext=mv.tool.getByClass(oAd,'next')[0];
	var iNow=0;
	var timer=setInterval(auto,3000);
	function auto(){
		if(iNow==aLi.length-1){
			iNow=0;	
		}else{
			iNow++;
		}
		for(var i=0;i<aLi.length;i++){
			mv.ui.fadeOut(aLi[i]);	
		}	
		mv.ui.fadeIn(aLi[iNow]);
	}
	function autoPrev(){
		if(iNow==0){
			iNow=aLi.length-1;	
		}else{
			iNow--;
		}
		for(var i=0;i<aLi.length;i++){
			mv.ui.fadeOut(aLi[i]);	
		}	
		mv.ui.fadeIn(aLi[iNow]);
	}
	
	aPrevBg.onmouseover=aPrev.onmouseover=function(){
		aPrev.style.display="block";
		clearInterval(timer);
	}
	aPrevBg.onmouseout=aPrev.onmouseout=function(){
		aPrev.style.display="";
		timer=setInterval(auto,3000);
	}
	aNextBg.onmouseover=aNext.onmouseover=function(){
		aNext.style.display="block";
		clearInterval(timer);
	}
	aNextBg.onmouseout=aNext.onmouseout=function(){
		aNext.style.display="";
		timer=setInterval(auto,3000);
	}
	aNext.onclick=function (){
		auto();	
	}
	aPrev.onclick=function (){
		autoPrev();	
	}
};
mv.app.toSel=function (){
	
	var oSel=document.getElementById("sel");
	var aDd=oSel.getElementsByTagName("dd");
	var aUl=oSel.getElementsByTagName("ul");
	var aH2=oSel.getElementsByTagName("h2");
	for(var i=0;i<aDd.length;i++){
		aDd[i].index=i;
		aDd[i].onclick=function (ev){
			var ev=ev || window.event;
			var This=this;
			for(var j=0;j<aUl.length;j++){
				aUl[j].style.display="none";	
			}
			aUl[this.index].style.display="block";
			ev.cancelBubble=true;//阻止事件冒泡
			document.onclick=function (){
				aUl[This.index].style.display="none";
				//alert(12);
			}
				
		}	
	}
	for(var i=0;i<aUl.length;i++){
		aUl[i].index=i;
		(function (ul){
			var aLi=ul.getElementsByTagName("li");
			for(var j=0;j<aLi.length;j++){
				aLi[j].onclick=function (ev){
					var ev=ev || window.event;
					ev.cancelBubble=true;//阻止事件冒泡
					aH2[this.parentNode.index].innerHTML=this.innerHTML;
					aUl[this.parentNode.index].style.display="none";
					//alert(12);	
				}	
			}
		})(aUl[i])	
	}	
};

mv.app.run=function (){
	var oRun=document.getElementById("run");
	var aUl=oRun.getElementsByTagName("ul")[0];
	var aLi=oRun.getElementsByTagName("li");
	
	var oPrev=mv.tool.getByClass(oRun,"prev")[0];
	var oNext=mv.tool.getByClass(oRun,"next")[0];
	var iNow=0;
	aUl.innerHTML+=aUl.innerHTML;
	aUl.style.width=aLi.length*aLi[0].offsetWidth+'px';
	oPrev.onclick=function (){
		if(iNow==aLi.length/2){
			iNow=0;
			aUl.style.left=0;	
		}
		mv.ui.moveleft(aUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
		//alert(iNow);
		iNow++;	
	};
	oNext.onclick=function (){
		if(iNow==0){
			iNow=aLi.length/2;
			aUl.style.left=-aUl.offsetWidth/2+"px";	
		}
		mv.ui.moveleft(aUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
		//alert(iNow);
		iNow--;	
	};
};