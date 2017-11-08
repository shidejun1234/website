// JavaScript Document

window.onload=function (){
	document.title="欢迎您!";
	y.app.toClickBtn();
	y.app.toLi();
	y.app.toTime();
	y.app.toCanvas();

};
window.onresize=function (){
	y.ui.setDiv();
	y.ui.setBgImg();	
	//alert(document.getElementById("bg").style.height);
};
var y={};
y.tools={};
y.tools.getByStyle=function (obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];//IE	
	}else{
		return getComputedStyle(obj,false)[attr];	
	}	
};

y.tools.changeNum=function (n){
	if(n<10){
		return '0'+n;
	}else{
		return ''+n;		
	}
};


y.ui={};
y.ui.setDiv=function (){
	var oC=document.getElementById('center');
	var oL=document.getElementById('left');
	var oR=document.getElementById('right');
	var oLBtn=document.getElementById('l_btn1');
	var dis=null;
	
	dis=y.tools.getByStyle(oC,'display');
	
	oLBtn.style.top=Math.floor( (document.body.clientHeight-oLBtn.offsetHeight) )+'px';
	oL.style.width=Math.floor( (document.body.clientWidth-oC.offsetWidth-oR.offsetWidth) )+'px';
	//oR.style.width=Math.floor( (document.body.clientWidth-oC.offsetWidth)/2 )+1+'px';
			
	if(dis=='block'){
		oL.style.width=Math.floor( (document.body.clientWidth-oC.offsetWidth)/2 )+'px';
		oR.style.width=Math.floor( (document.body.clientWidth-oC.offsetWidth)/2 )+1+'px';
		oC.style.marginLeft=oL.offsetWidth+'PX';	
		oC.style.marginRight=oR.offsetWidth+'PX';
	}		
};

y.ui.setBgImg=function (){
	var oImg=document.getElementById("bg_img");
	oImg.style.height=document.body.scrollHeight+'px';	
	oImg.style.width=document.body.scrollWidth+'px';	
};

y.ui.setTimer=function (){
	var oTime=document.getElementById('time')
	var oDate=new Date();
	var year=oDate.getFullYear();
	var month=oDate.getMonth()+1;
	var day=oDate.getDate();
	var hour=oDate.getHours();
	var mintue=oDate.getMinutes();
	var second=oDate.getSeconds();	
	var d=year+'/'+month+'/'+day+'  '+y.tools.changeNum(hour)+':'+y.tools.changeNum(mintue)+':'+y.tools.changeNum(second);
	oTime.innerHTML=d;	
		
};

y.ui.changeOpacity=function (obj,iTarget){
	clearInterval(obj.timer);
	var speed=(iTarget-obj.alpha);
	speed=speed>0?Math.ceil(speed):Math.floor(speed);
	obj.timer=setInterval(function(){
		if(obj.alpha==iTarget){
			clearInterval(obj.timer);	
		}else{
			obj.alpha+=speed;
			obj.style.fliter='alpha(opacity:'+obj.alpha+')';
			obj.style.opacity=obj.alpha/100;
		}
	},30);	
};

y.ui.draw=function (){
	var oC=document.getElementById("ZB_c1");
	var oGC=oC.getContext("2d");
	
	var x=50;
	var y=50;
	var r=45;
	var data=new Date();
	var oHour=data.getHours();
	var oMin=data.getMinutes();
	var oSec=data.getSeconds();
	var oHourValue=(-90+oHour*30+oMin/2)*Math.PI/180;
	var oMinValue=(-90+oMin*6)*Math.PI/180;
	var oSecValue=(-90+oSec*6)*Math.PI/180;
				
	oGC.save();
	oGC.beginPath();//画1分钟线
	oGC.lineWidth=0.5;
	oGC.strokeStyle="#543713";
	for(var i=0;i<60;i++){
		oGC.moveTo(x,y);
		oGC.arc(x,y,r,6*i*Math.PI/180,6*(i+1)*Math.PI/180,false);
		oGC.stroke();
	}
	oGC.closePath();
	oGC.restore();
				
	oGC.beginPath();//填充灰色
	oGC.fillStyle="#cccccc";
	oGC.arc(x,y,r*19/20,0,360*Math.PI/180,false);
	oGC.fill();
	oGC.closePath();
				
	oGC.save();
	oGC.beginPath();//画5分钟线
	oGC.lineWidth=1;
	oGC.strokeStyle="#543713";
	for(var i=0;i<60;i++){
		oGC.moveTo(x,y);
		oGC.arc(x,y,r,30*i*Math.PI/180,30*(i+1)*Math.PI/180,false);
		oGC.stroke();
	}
	oGC.closePath();
	oGC.restore();
				
	oGC.beginPath();//填充灰色
	oGC.fillStyle="#cccccc";
	oGC.arc(x,y,r*18/20,0,360*Math.PI/180,false);
	oGC.fill();
	oGC.closePath();
				
				
	oGC.beginPath();//绘制时针
	oGC.strokeStyle="#543713";
	oGC.lineWidth=5;
	oGC.moveTo(x,y);
	oGC.arc(x,y,r*8/20,oHourValue,oHourValue,false);
	oGC.stroke();
	oGC.closePath();
				
	oGC.beginPath();//绘制分针
	oGC.lineWidth=3;
	oGC.moveTo(x,y);
	oGC.arc(x,y,r*11/20,oMinValue,oMinValue,false);
	oGC.stroke();
	oGC.closePath();
				
	oGC.beginPath();//绘秒时针
	oGC.lineWidth=1.5;
	oGC.moveTo(x,y);
	oGC.arc(x,y,r*14/20,oSecValue,oSecValue,false);
	oGC.stroke();
	oGC.closePath();
};

y.ui.setLi=function (){
	var oC=document.getElementById('center');
	var aUl=oC.getElementsByTagName('ul')[0];
	var aLi=aUl.getElementsByTagName('li');
	var str="";
	var arr=[];
	var arrUrl=[
		'search.html',
		'http://ke.qq.com/',
		'http://www.qq.com/',
		'http://www.guet.edu.cn/extGuetWeb/',
		'http://www.iqiyi.com',
		'http://weibo.com/u/5223976454/home?wvr=5',
		'http://news.ifeng.com:8080/mil/',
		'http://y.qq.com/',
		'http://w.qq.com'
	];
	arr.push(arrUrl);
	var arrText=[
		'百度',
		'腾讯课堂',
		'腾讯',
		'桂电',
		'爱奇艺',
		'微博',
		'凤凰军事',
		'QQ音乐',
		'Web QQ'
	];
	arr.push(arrText);
	for(var i=0;i<arrText.length;i++){
		str+="<li>"+arrText[i]+"</li>";	
	}
	aUl.innerHTML=str;
	return arr;
};

y.app={};
y.app.toClickBtn=function (){
	y.ui.setDiv();//初始化Div
	
	var oLBtn=document.getElementById('l_btn1');
	var oC=document.getElementById('center');
	var oR=document.getElementById('right');
	var onOff=true;
	oLBtn.onclick=function (){
		if(onOff){
			oC.style.display='block';
			oR.style.display='block';
			y.ui.setDiv();
			onOff=false;
		}else{
			oC.style.display='none';
			oR.style.display='none';
			y.ui.setDiv();	
			onOff=true;
		}
	};	
};

y.app.toTime=function (){
	y.ui.setTimer();//初始化时间
	setInterval(y.ui.setTimer,1000);
};

y.app.toCanvas=function (){
	y.ui.draw();	
	setInterval(y.ui.draw,1000);
};

y.app.toLi=function (){
	var arr=y.ui.setLi();
	var oC=document.getElementById('center');
	var aLi=oC.getElementsByTagName('li');
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onclick=function (){
			window.open(arr[0][this.index]);	
		};
	}
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].timer=null;
		aLi[i].alpha=30;
		aLi[i].onmouseover=function (){
			y.ui.changeOpacity(this,100);	
		};	
		aLi[i].onmouseout=function (){
			y.ui.changeOpacity(this,30);	
		};	
		
	}
};
