GIT常用命令
  $ git init
  $ git add .
  $ git commit -m''
  $ git status
  $ git log
  $ git checkout .
  $ git reset --hard 版本号

=====================
团队协作开发

1.基础流程操作
 1）首先创建中央仓库:可以基于gitHub/codding来创建（最好不要创建空仓库，因为空仓库中没有任何分支，只有提交一次历史信息才会生成MASTER分支）
   http://github.com/

   把开发者都列入仓库的开发群组中，这样每一个开发者用自己的gitHub账号，都有权限操作这个仓库了（当然不这样做也可以，所有开发者用统一的一个账号也可以，为了防止不知道是谁提交的，我们需要让每一个客户端在本地的GIT全局配置中，设置和gitHub相同的用户名和邮箱 $ git config --global user.name 'xxx' ...）

 2）创建客户端本地仓库（一个开发者就是一个单独仓库），还需要让本地的仓库和远程仓库保持关联，这样才可以实现后续的信息同步
   $ git init    =>创建本地仓库
   $ git remote add origin “远程仓库GIT地址”   =>让本地仓库和远程仓库保持连接
   $ git remote -v    =>查看连接信息（origin是连接的名称，一般都用这个名字，当然自己可以随便设置）
   $ git remote rm origin     =>移除本地仓库和远程仓库的链接
   $ git remote update origin   =>更新链接通道

   有更简单的方式：只要把远程仓库克隆到本地，就相当于创建本地仓库，而且自动建立了链接，并且把远程仓库中的内容也同步到了本地
   $ git clone “远程仓库地址” “本地仓库文件夹名字（不写默认是仓库名字）”


 3）各自和中央服务器同步信息
   推送：$ git push origin master   （每一次PUSH之前最好都PULL一下：如果有冲突在本地处理一下冲突，然后再推送）
   拉取：$ git pull origin master

======================
知识点：
  $ git clone “远程仓库地址”   把远程仓库克隆到本地（本地自动和远程建立连接，自动把远程中的信息同步到本地了，本地也是一个单独的仓库：建议远程仓库不要是空的，至少有一个master分支）

  $ git pull origin master  把远程仓库MASTER中的信息同步到本地仓库MASTER中

  $ git push origin master  把本地仓库MASTER中的信息同步到远程仓库MASTER中（需要使用gitHub的用户密码来进行权限校验：一般都是组长在远程仓库中把组员的账号都放到小组中，这样组员用自己的账号也有权限操作仓库了，最好在本地的GIT配置中把用户名和邮箱修改为和gitHub账号相同的信息）

  如果有冲突：
     1.进入到了编辑框模式，i->ESC->:wq 即可
     2.自己会把两份代码都保存在本地文件中，自己手动去选择要哪一个，改完后重新提交即可

  $ git checkout -b xxx  创建分支并且切换到指定分支下（可以把本地master中的历史信息同步到新创建的分支中）
    git branch
    git branch xxx
    git checkout xxx
    git branch -D xxx 删除分支

  $ git merge xxx  把xxx分支的历史信息合并到当前分支下

  $ git stash / $ git stash pop  在切换分支的时候，有一部分信息并没有提交成为历史版本，为了防止信息的丢失，我们需要先使用stash保存，然后在基于stash pop还原

=============
作业：

  组长创建一个中央仓库（把组员加入到群组中）
    每个组员都有一个自己单独的文件夹，管理自己的代码；项目中有一个公共的utils.js，要求每个组员至少在上面留下自己的一点痕迹... 最后每个人本地仓库中包含所有人提交的最新信息
