
var length = 10;
var count = 0;

//计时器
var hour = 0,minute = 0,second = 0;
var t = 0;
var flag;
var bClicked = 0;

//开始计时
function startCount(){
    if(!bClicked){
        timedCount();
        bClicked = 1;
    }
}

//停止计时
    function stopCount(){
        if(bClicked){
            stopTimeCount();
            bClicked = 0;
        }
   }
    
    //归零
function reCount(){
	stopCount();
	document.getElementById('showtime').innerHTML = "00:00:00";
hour = 0,minute = 0,second = 0;
t = 0;
bClicked = 0;
}

function timedCount()
{
    hour=Math.floor(t/60/60);
    minute=Math.floor(t/60%60);
    second=Math.floor(t%60);
    if(hour<10){
        hour = "0" + hour;
    }
    if(minute<10){
        minute = "0" + minute;
    }
    if(second<10){
        second = "0" + second;
    }

    document.getElementById('showtime').innerHTML = hour +":"+minute+":"+second;
    t = t + 1;
    flag = setTimeout("timedCount()", 1000);           
}
//终止学习计时器
function stopTimeCount(){
    clearTimeout(flag);
}

//初始化
function numb(){
	startCount();
	for(var i = 0;i<length;i++){
		var ol = document.getElementsByTagName("ol")[0];
		var li = document.createElement("li");	
						
		var span1 = document.createElement("span");
		var span2 = document.createElement("span");
		var input1 = document.createElement("input");
		span1.className = "num" + i;
		span2.className = "num" + i;
		
		input1.className = "input" + i;
		input1.type = "text";
		input1.name = "answer";
		input1.className = "form-control";
		

		var span = document.createElement("span");
		span.innerHTML = " ";
		var input2 = document.createElement("input");
		input2.type = "hidden";
		input2.className = "input" + i;
		
		ol.appendChild(li);
		li.appendChild(span1);
		li.appendChild(span2);				
		li.appendChild(input1);
		li.appendChild(span);
		li.appendChild(input2);
						
		function come(){											
			var symbol = ["+","-"];
		    var sign = symbol[Math.round(Math.random())];
		    var signl = document.createTextNode(sign);
			var equal = document.createTextNode("=");
			var num1 = parseInt(Math.round((Math.random())*20));
			var num2 = parseInt(Math.round((Math.random())*20));
		
			function voluation(){						
				span1.innerHTML = num1;
				span2.innerHTML = num2;						
				li.insertBefore(signl,span2);
				li.insertBefore(equal,input1);
			}										
			if(sign == "+"){
				input2.value = num1 + num2;						
				if(input2.value <= 20){
					voluation();							
				}
				else{						
					come();							
				}						
			} 
			else{
				input2.value = num1 - num2;						
				if(input2.value >= 0){
					voluation();
				}
				else{							
					come();
				}						
			}					
		}				
		come();						
	}			
}	
//交卷
function refer(){			
    var error = [];
	var li = document.getElementsByTagName('li');
	for(var i=0;i<length;i++){
        li[i].childNodes[4].disabled = "disabled";
		if(li[i].childNodes[4].value == li[i].childNodes[6].value){
			li[i].childNodes[5].className = "glyphicon glyphicon-ok text-success";
            count++;
		}

		else{
			li[i].childNodes[5].className = "glyphicon glyphicon-remove text-danger";
			li[i].childNodes[5].innerHTML = "答案为"+li[i].childNodes[6].value;
            
		}	
	}	
    
    alert("正确率为"+(count/length)*100+"%");
    count = 0;
    stopCount();
}	

//换卷
function renumb(){
	var ol = document.getElementsByTagName("ol")[0];
	ol.innerHTML = "";
	reCount();
	numb();
	
}
//换题目数量
function selectnum(){
    var select = document.getElementById("select"); 
    length = select.value;
    reCount();
    renumb();
}