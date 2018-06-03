/*
 * JS运行在客户端浏览器中=>“前端”
 *   浏览器给JS提供可很多全局的属性和方法，例如：window.xxx（setInterval、setTimeout、eval、alert、JSON...）
 *
 * JS运行在服务器端的NODE中=>“后台”
 *   NODE也给JS提供很多的内置属性和方法，例如：http、fs、url、path...等对象中都提供很多API供JS操作
 *
 * =====
 *
 * 前端（浏览器运行JS）是限制I/O操作的
 *    input type='file' 这种算是I/O操作，但是需要用户手动选择（而且还仅仅是一个读取不是写入）
 *
 * NODE中运行JS是不需要限制I/O操作的
 */