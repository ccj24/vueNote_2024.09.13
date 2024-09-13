/*
动态组件 && 缓存:
使用 is attribute 来切换不同的组件；每次切换Vue 都创建了一个新的 currentTabComponent 实例，可以用一个 <keep-alive> 元素将其动态组件包裹起来实现缓存

*/
<component v-bind:is="currentTabComponent"></component>

<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>