1.什么是NODE？
 基于V8引擎（谷歌浏览器的引擎）渲染JS的工具或者环境
   ->安装NODE
   ->把JS代码放到NODE环境中执行

2.安装NODE
 https://nodejs.org/en/

 node安装完成后
   ->当前电脑上自动安装了npm(Node Package Manager)：一个JS模块（所有封装好可以供其它人调取使用的都可以称之为模块或者包）管理的工具，基于npm可以安装下载JS模块
   ->它会生成一个node执行的命令（可以在DOS窗口或者终端命令中执行）：node xxx.js

 如果不成功，可以找相同电脑配置的人员，把安装成功的NODE文件夹拷贝到自己的电脑上，通过配置环境变量，来实现NODE安装

3.如何在NODE中渲染和解析JS
 ->REPL模式 (Read-Evaluate-Print-Loop，输入-求值-输出-循环)

 ->直接基于NODE来执行JS文件
   1）在命令窗口中执行（DOS窗口 & 终端窗口）
   2）WB中的Terminal中也可以执行node命令
   3）直接在WB中执行（右键=>RUN xxx.js），这种方式可能会产生缓存（尤其是文件的目录改动后）

4.之所以把NODE作为后台编程语言，是因为：
 1）我们可以把NODE安装在服务器上
 2）我们可以把编写的JS代码放到服务器上，通过NODE来执行它（我们可以使用JS来操作服务器，换句话说，使用JS来实现服务器端的一些功能操作 =>其实说NODE是后台语言，想要表达的是JS是后台语言 “JS是一门全栈编程语言”）

5.NODE做后台的优势和特点
 传统后台语言：JAVA/Python/PHP/C#(.NET)...
 =>单线程的
 =>基于V8引擎渲染：快
 =>异步无阻塞的I/O操作：I/O (INPUT/OUTPUT) 对文件的读写
 =>event-driven事件驱动：类似于发布订阅或者回调函数

6.在WB中开启NODE内置方法的代码提示
  File -> settings -> languages & frameworks -> node.js and npm -> 开起代码提示只要点击“Enable”按钮即可（Disable是取消代码提示）


============================
NPM的应用
  目前“工程化/自动化”开发（不一定是写后台），都是基于NODE环境，基于NPM管理模块，基于WEBPACK实现模块之间的依赖打包，部署上线等

  NPM常规操作
  ```
    npm install xxx  把模块安装到当前目录（在哪个目录下执行的命令，这个目录就是当前目录）下
    npm install xxx -g 把模块安装在全局目录下

    npm uninstall xxx / npm uninstall xxx -g 卸载模块

    npm install xxx@xxx 安装指定版本号的模块

    npm view xxx > xxx.version.txt  查看模块的历史版本信息
  ```

  NPM的默认安装源都是在 https://www.npmjs.com/ 网站中查找的，在国内安装，下载速度较慢，想要下载速度快一些，我们可以如下处理：
  1.使用淘宝镜像
    ->安装cnpm，后期都是基于cnpm安装管理
    ```
      npm install cnpm -g
      cnpm install zepto
    ```

    ->安装nrm切源工具，基于nrm把源切换到淘宝源上
    ```
      npm install nrm -g

      nrm ls 查看当前可用的源
      nrm use xxx 使用某个源

      这样处理完成后，后期模块的管理依然基于npm即可
    ```

  2.基于YARN安装：它也是模块管理器，类似于NPM，但是安装管理的速度比NPM快很多
    ```
      npm install yarn -g

      yarn add xxx
      yarn remove xxx

      使用yarn只能把模块安装到当前目录下，不能安装到全局环境下
    ```

  3.bower也是类似于npm的包管理器，只不过它是从gitHub下载安装
    ```
      npm install bower -g

      bower install xxx
      ...
    ```