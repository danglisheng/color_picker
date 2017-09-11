# color_picker
便携式取色器

1、设计思想<br/>
当用户点击图片时，获取点击处的像素颜色值，并将该值以div元素的背景色的方式渲染出来。点击保存色块按钮可将获取的值保存至本地存储，以便下次访问时显示。用户也可点击使用本地图片，利用以上方法获取颜色值。
2、具体实现<br/>
(1)当图片加载完成后，对其进行裁剪，之后将其绘制在画布上。为画布的onclick事件指定回调函数，在该回调函数里，用画布上下文的getImageData方法获取鼠标点击位置的颜色值，将其设定为指定div元素的background，并保存在全局变量color里。<br/>
(2)当用户点击“保存色块”按钮时，先对localStorage保存的数据进行遍历，如果某项数据的值与color值相同，则弹出警告框。否则，将要添加的颜色值设为div元素的背景色并渲染出来,并保存至本地存储。<br/>
(3)当用户点击“使用本地图片”按钮时，利用FileReader()的实例读取FileList对象（该对象来自input元素的files属性）,把读到的值赋给new Image()的src属性，然后在画布上将图像绘制出来。<br/>
(4)在页面初次加载时，需要初始化——遍历localStorage，查找是否有保存的颜色值，如果有，则将其渲染在页面上。<br/>
<hr/>
3.注意:<br/>
   因为浏览器的跨域安全限制,canvas API的getImageData方法只能操作同一域名下的图片，如果不搭建本地服务器，只在浏览器下打开html页面，JavaScript是无法调用getImageData方法的。。
