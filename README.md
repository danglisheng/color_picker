# color_picker
便携式取色器
1、使用技术:
（1）用canvas绘制图像并获取像素值。
（2）HTML5本地存储。
（3）HTML读取本地文件。
（4）访问摄像头。
2、实现功能:
（1）获取鼠标点击处颜色值。
（2）将获取到的颜色保存至本地存储。
（3）所用图片可以从本地查找，也可拍照。
3.注意:
   因为浏览器的跨域安全限制,canvas API的getImageData方法只能操作同一域名下的图片，如果不搭建本地服务器，只在浏览器下打开html页面，JavaScript是无法调用getImageData方法的。。