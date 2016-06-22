# Act Europapokal Pages

> 第一次尝试使用Gulp将javascript, css, image 压缩打包在./dist文件夹下

***

实现功能：
* 1、JS文件非全体打包（./config/dist.js以及./libs/*.js不打包）；
* 2、CSS文件更新时更改版本号；
* 3、image文件5级压缩，JPG格式无损压缩

***

存在问题：
* 1、JS文件同CSS文件，image文件共同使用添加版本号插件gulp-rev时存在Bug，目前只对CSS文件应用；
* 2、CSS文件使用gulp-rename插件改名保存两套时，页面<link>标签引用版本号更新存在问题；
* 3、image文件watch监听更新时，同一图片更改名称只第一次有效；
* 4、gulp-imagemin插件压缩等级改变貌似无效果。

***

                                                                             （2016 06 23 03:39:09 于东四十条甲25号）
