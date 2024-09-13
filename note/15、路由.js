/*
路由：
一套映射规则，浏览器中的哈希值（# hash）与展示视图内容（template、component）之间的对应规则；当URL中的哈希值（# hash）发生改变后，路由会根据制定好的规则，展示对应的视图内容
在 Web app 中，通过一个页面来展示和管理整个应用的功能。

hash模式：通过#号后面的内容的更改，触发hashchange事件，实现路由切换
history模式：通过pushState和replaceState切换url，触发popstate事件，实现路由切换，需要后端配合
*/