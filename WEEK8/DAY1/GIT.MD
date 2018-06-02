GIT：分布式版本控制系统
  1.版本控制系统
    开发中我们把每一次的修改都有效的进行记录（记录成一个版本），后期如果需要回退到原有的有个版本或者是用当前的和某一个版本进行比较等，都可以有效的进行管理
    常用的版本控制系统：SVN(集中式) / GIT(分布式)

  2.分布式版本管理系统的特点

  3.Linux团队开发的git，所以git中的命令大部分都是linux命令

=======================
后期我们更多的都是基于命令来完成GIT管理的,所以我们学一些简单的LINUX命令
  WINDOWS操作系统：DOS窗口和DOS命令
  LINUX服务器操作系统：LINUX命令 （MAC的终端使用的也是LINUX命令）

```
    ls -l/-a：查看当前目录结构（-a是可以看见所有的：包含隐藏的）
    cd xxx[路径地址]：进入到执行的文件夹中（进入的路径地址，可以粘贴到对应的操作命令窗口中）
      cd /：根目录
      cd ./：当前目录
      cd ../：上级目录

    clear：清屏

    mkdir：创建文件夹

    touch：创建空的文件

    vi：向文件中插入或者管理一些内容
      i=>进入到插入模式
      ESC + :WQ ，退出内容的插入模式，把刚才编辑的内容进行保存

    echo：向指定的文件中输入内容

    cat：查看文件中的内容

    cp：拷贝

    rm：删除文件  -r（递归删除）-f（强制删除），一旦删除无法还原
```

=======================
GIT的常规流程
  1.每一个GIT仓库都有三个区：
    工作区：写代码
    暂存区：临时存放每一次修改的代码，但是并没有生成历史版本
    历史区：存放所有历史版本的地方(提交到历史区就会生成历史版本)

  2.把暂存区的某一个文件删除（提交到暂存区的内容不好，我们可以删除）
    $ git rm --cached xxx.xx
    $ git rm --cached . -r  删除暂存区中所有提交的

    如果在删除过程中，发现从暂存区删除的文件，在工作区已经被修改了，只有加上 -f 才能强制从暂存区把内容删除掉

  3.提交到暂存区一份，把工作区内容改了，但是改的东西不好，想把暂存区上次提交的内容撤回到工作区（覆盖工作区新写的内容）
    $ git checkout xxx.xx

   暂存区内容没有消失，只是把工作去最新修改的信息给覆盖了，让工作区和暂存区保持一致

======================
一些细节问题
  1.如果是第一次使用git，生成历史版本的时候，需要提供身份认证
  ```
    只需要在本地GIT全局环境下配置一些信息即可
    $ git config -l
    $ git config --global user.name 'xxx'
    $ git config --global user.eamil 'xxx'
  ```

  2.真实项目中，并不是所有的文件都和项目有关系（例如：.idea是WS生成的配置文件夹和项目没关系），也不是所有的文件都提交
  （例如：node_modules中的内容太大了，也不需要提交）

  .gitignore  =>GIT提交的忽略文件
  ```
    # dependencies
    /node_modules

    # testing
    /coverage

    # production
    /build

    # misc
    .DS_Store
    .env.local
    .env.development.local
    .env.test.local
    .env.production.local

    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*

    .idea
  ```

  3.$ git log 查看历史版本信息











