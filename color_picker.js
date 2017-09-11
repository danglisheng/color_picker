var color_saver_button=document.getElementById("color_saver_button");
var saved_color_area=document.getElementById("saved_color_area");
var color='rgba(0,0,0,1)';
var colorblock=document.getElementById("colorblock");
var rgb_value=document.getElementById("rgb_value");
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var canvasWidth=canvas.width;
var canvasHeight=canvas.height;
//把相对于浏览器的坐标转换为相对于画布的坐标
function windowToCanvas(x,y)
	{
		var bbox=canvas.getBoundingClientRect();
		return {x:x-bbox.left,y:y-bbox.top};
	}
//读取颜色像素值的函数
function pickColor()
	{
		canvas.onclick=function(e)
		{
			var point=windowToCanvas(e.clientX,e.clientY);
			var data=ctx.getImageData(point.x,point.y,1,1).data;
			color="rgba("+data[0]+","+data[1]+","+data[2]+","+(data[3])/255+")";
			colorblock.style.background=color;
			rgb_value.innerHTML=String(color);
		}
	}
function display_rgb_value(x)
	{
		rgb_value.innerHTML=String(x);
	}
//图片处理，目标是：1.图片不能超出画布，且图片比例不变。
//2.画布至少一边被铺满
function image_process(img_x,img_y){
	var img={};
	var ratio_img=img_x/img_y; //图片宽高比。
	var ratio_canvas=canvasWidth/canvasHeight;//画布宽高比
	if(ratio_canvas>ratio_img)  //画布宽高比大于图片宽高比，要使缩放后的图片不超过画布，则缩放后的图片高度取画布高度；
		{
			img.y=canvasHeight;
			img.x=canvasHeight*ratio_img;
		}
	else{     img.x=canvasWidth;                          //画布宽高比小于图片宽高比
			  img.y=canvasWidth/ratio_img;
	}
  	return img;
}
//加载预处理图片
var bird=new Image();
bird.src="./img/a.jpg";
bird.onload=function(){
	var img=image_process(bird.width,bird.height);
	ctx.drawImage(bird,0,0,img.x,img.y);
	}
//保存色块
//遍历本地存储，查找颜色值是否已经保存。
function checkAndStore(color)
	{
		if(window.localStorage)
		{
			for(i=0;i<localStorage.length;i++)
				{
					if(localStorage.getItem(localStorage.key(i))==String(color))
					{
						alert("您已保存过该颜色:"+localStorage.key(i)+"，请勿重复保存！");
						return;
					}

				}
			addColorBlock(color);
			localStorage.setItem(String(color),String(color));
		}
	}
//把特定背景色的div添加至DOM.
function addColorBlock(color)
	{
		var block_wrapper=document.createElement("div");
		var color_value=document.createElement("div");
		var color_block=document.createElement("div");
		color_block.style.background=color;
		color_block.style.width="100%";
		color_block.style.height="50px";
			
		block_wrapper.style.width="180px";
		block_wrapper.style.height="90px";
		block_wrapper.style.overflow="auto";
		block_wrapper.style.float="left";
		block_wrapper.style.border="solid 1px black";
		block_wrapper.style.marginLeft="10px";
		color_value.innerHTML=color;
		saved_color_area.appendChild(block_wrapper);
		block_wrapper.appendChild(color_block);
		block_wrapper.appendChild(color_value);
	}
color_saver_button.onclick=function()
	{
		checkAndStore(color);
	}
//页面加载后，从本地存储里读取上次保存的颜色值，并添加色块至DOM.
function retireveColorFromStorage()
	{
		if(window.localStorage)
			{
				for(var i=0;i<localStorage.length;i++)
					{
						if(localStorage.key(i).substring(0,4)=="rgba")
						{
							addColorBlock(localStorage.key(i));
						}
					}
			}
	}
//读取本地文件
var upload=document.getElementById("filepicker");
upload.onchange=function()
	{
    	var file=upload.files[0];
    	var pic=new Image();
    	var reader=new FileReader();
    	reader.readAsDataURL(file);
    	reader.onload=function(e){
    		pic.src=e.target.result;
    		pic.onload=function(){
    			var img=image_process(this.width,this.height);
    			ctx.clearRect(0,0,canvasWidth,canvasHeight);
    			ctx.drawImage(pic,0,0,img.x,img.y);
    		}
    	}		
    }
function setup()
	{
		 pickColor();
 		 retireveColorFromStorage();
	}
setup();

   

    