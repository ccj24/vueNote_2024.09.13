/*
vue的官网地址 https://cn.vuejs.org/v2/guide/index.html;
Vue.js:一套基于构建用户界面的渐进式框架;

特点：
 1.生命式渲染：采用简洁的末班语法来声明式地将数据渲染进dom的系统，在底层的实现上，vue将模版编译成虚拟dmo渲染函数
 2.数据双向绑定，v-model实现表单的双向绑定，v-model本质上是语法糖，它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。
<input v-model="searchText"></input>
等价于
<input 
  v-bind:value ="searchText"
  v-on:input="searchText"="$evedt.target.value"
>

3、组件化：
4、SPA(单页应用程序)
5、渐进式
6、：其实是v-bind的简写
*/


/*
SPA：Single Page Application
单页Web应用只有一个Web页面的应用，是加载单个HTML页面，并在用户与应用程序交互时动态更新该页面的Web应用程序。
  
单页面应用程序：只有第一次会加载页面, 以后的每次请求, 仅仅是获取必要的数据.然后, 由页面中js解析获取的数据, 展示在页面中
传统多页面应用程序：每次请求服务器返回的都是一个完整的页面

优势:
 1 减少了请求体积，加快页面响应速度，降低了对服务器的压力
 2 更好的用户体验，让用户在web app感受native app的流畅
缺点：
 1 单页面不利于seo
 2 首屏加载时间长

实现思路和技术点:
    1 ajax
    2 锚点的使用（window.location.hash #）
    3 hashchange 事件 window.addEventListener("hashchange",function () {})
    4 监听锚点值变化的事件，根据不同的锚点值，请求相应的数据
    5 原本用作页面内部进行跳转，定位并展示相应的内容
*/


/*
Vue 实例：
每个 Vue 应用都是用 Vue 函数创建一个Vue 实例；虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发，因此在文档中经常会使用 vm表示 Vue 实例
data 对象中的所有的 property 加入到 Vue 的响应式系统中(只有当实例被创建时就已经存在于 data 中的 property 才是响应式的，新property不具备响应式)
*/
var vm = new Vue({
    // 选项对象
  })


  /*
Vue 组件:
组件是可复用的 Vue 实例，且带有一个名字，可以在Vue 根实例中把组件作为自定义元素来使用。由于组件是Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。
一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝，否则不同组件的数据将会互相影响。
分为全局注册和局部注册；
父组件通过prop向组件传值，子组件调用内建的 $emit 方法并传入事件名称使父组件触发一个事件；通过插槽slot分发内容;
动态组件:通过 Vue 的 <component> 元素加一个特殊的 is attribute 来实现
在某些特定的标签中只能存在指定表恰 如ul > li 如果要浏览器正常解析则需要使用is
*/
Vue.component('button-counter', {
    data: function () {
      return {
        count: 0
      }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
  })
  
  <component v-bind:is="currentTabComponent"></component> // 组件会在 `currentTabComponent` 改变时改变,currentTabComponent为组件名
  
  <ul id="app">
    <my-li></my-li> // 不能识别
    <li is="my-li"></li> // 正常识别
  </ul>
  <script>
    var vm = new Vue({
      el: "#app",
      components : {
        myLi : {
          template : `<li>内容</li>`
        }
      }
    })
  </script>


/*
 表单修饰符
 <input v-model.lazy="msg">  //在change时更新 并非在input更新
 <input v-model.number="age" type="number">//自动将用户输入的类型转换为munber
 <input v-model.trim="msg"> // 自动过滤用户输进的收文空白字符
  
*/



/*
  class与style绑定(可以传字符串、对象、数组)

<div v-bind:class="{active:isActive}"></div> //active这个calss的存在取决于isActive是否为真
<div class="static" v-bind:class="{active:isActive,'text-danger':hasError}"></div> //传入多个class  和普通的class共存在
 <div v-bind:class="classObject"></div>  // 可将class提取放在data、computed中
    data: {
    classObject: {
        active: true,
        'text-danger': false
    }
    }
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div> 
<div v-bind:class="[{ active: isActive }, errorClass]"></div>  // 数组语法中也可以使用对象语法

<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}

<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}

*/


/*
v-if/v-else/v-else-if 条件渲染
v-if 是一个指令，所以必须将它添加到一个元素上,此时可以把一个 <template> 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 <template> 元素
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>

v-show
元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS property display。
v-show 不支持 <template> 元素，也不支持 v-else

v-if vs v-show区别：
v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
v-if 是惰性的，如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块；v-show 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
*/



/*
v-for 列表渲染
Vue使用v-for渲染的元素列表时，默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。
为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，可为每项提供一个唯一 key attribute（key为字符串或数值类型的值）
当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。这意味着 v-if 将分别重复运行于每个 v-for 循环中。

变更方法：会触发视图更新
push()、pop()、shift()、unshift()、splice()、sort()、reverse()

非变更方法：不会变更原始数组，而总是返回一个新数组；使用时可以用新数组替换旧数组
filter()、concat() 和 slice()
Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，使用新数组并不会丢弃现有 DOM 并重新渲染整个列表
*/

