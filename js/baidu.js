// JavaScript Document
function beijing(data){
		var oUl1=document.getElementById('ul1');
		if(data.s.length){
			
			oUl1.style.display= 'block';
			var html="";
			for(var i=0;i<data.s.length;i++){
				html += '<li><a target="_blank" href="http://www.baidu.com/s?wd='+data.s[i]+'">'+ data.s[i] +'</a></li>';	
			}
			oUl1.innerHTML=html;
		}else{
			oUl1.style.display="none";
			}
		
	}
	window.onload=function(){
			var oDiv1=document.getElementById('div1');
			var oTxt1=document.getElementById('txt1');
			var oBtn=document.getElementById('btn1');
			var oUl1=document.getElementById('ul1');
			oTxt1.placeholder="欢迎你,百度一下";
			var A=null;
			oTxt1.onkeydown=function(event){
				var x=event.keyCode;
				if(x==13){
					window.open("http://www.baidu.com/s?wd="+oTxt1.value);
					oUl1.style.display="none";
				}
			}
			
		
			oBtn.onclick=function(){
				
				window.open("http://www.baidu.com/s?wd="+oTxt1.value);
				oUl1.style.display="none";
			}
			
			oTxt1.onkeyup=function (){
				if(this.value!=' '){
					oScript=document.createElement('script');
					oScript.src="http://suggestion.baidu.com/su?wd="+this.value+"&cb=beijing";
					document.body.appendChild(oScript);	
				}else{
						oUl1.style.display="none";
					 }
			}
	}
	