/*
指令：
带有 v- 前缀的特殊 attribute，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
示例：
v-bind（接收一个参数，响应式更新，缩写为：）
v-model（在表单元素上创建双向数据绑定，监听用户的输入事件以更新数据）
v-text（更新DOM对象的 textContent）
v-html（更新DOM对象的 innerHTML）
v-for（基于源数据多次渲染元素或模板块，使用 key，VUE会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素）
v-if（根据表达式的值的真假条件，销毁或重建元素）
v-show（根据表达式之真假值，切换元素的 display CSS 属性）
v-pre（vue会跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。）
v-once（vue只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。）

v-on（监听事件，缩写为@）
<a v-bind:href="url">...</a>  <a :href="url">...</a>
<a v-on:click="doSomething">...</a>   <a @click="doSomething">...</a>
*/


/*
自定义指令:
对普通 DOM 元素进行底层操作,分为全局指令和局部指令
*/
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
// 局部指令
directives: {
  focus: {
    inserted: function (el) {
      el.focus()
    }
  }
}
// 使用 <input v-focus> 

/*
钩子函数:
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。
componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
unbind：只调用一次，指令与元素解绑时调用。

钩子函数参数:
el：指令所绑定的元素，可以用来直接操作 DOM。
binding：一个对象，包含以下 property：
  name：指令名，不包括 v- 前缀。
  value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
  oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
  expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
  arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
  modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
*/
Vue.directive('color-swatch', function (el, binding) {// 函数简写,在 bind 和 update 时触发相同行为
  el.style.backgroundColor = binding.value
})


/*
自定义指令 例子：
directives示例
谷歌图片的加载、highlight高亮
https://juejin.cn/post/6844903465643147278
*/

