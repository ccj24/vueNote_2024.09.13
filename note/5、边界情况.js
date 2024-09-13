/*
$parent
从一个子组件访问父组件的实例，以替代将数据以 prop 的方式传入子组件的方式。

ref 访问子组件实例或子元素,只会在组件渲染完成之后生效，并且它们不是响应式的。
*/
<base-input ref="usernameInput"></base-input>
this.$refs.usernameInput

<input ref="input" />
this.$refs.input.focus() // 从父级组件聚焦输入框


/*
依赖注入:provide 和 inject
provide 选项允许我们指定我们想要提供给后代组件的数据/方法；后代组件使用 inject 选项来接收
实际上，可以把依赖注入看作一部分“大范围有效的 prop”，除了：祖先组件不需要知道哪些后代组件使用它提供的 property；后代组件不需要知道被注入的 property 来自哪里
缺点：非响应式，如果你想在祖先组件中更新所提供的数据，可以使用Vuex 
*/
provide: function () {
  return {
    getMap: this.getMap
  }
}

inject: ['getMap']


/*
强制更新：$forceUpdate
通过 v-once 创建低开销的静态组件：
*/
    <div v-once>
      <h1>Terms of Service</h1>
      ... a lot of static content ...
    </div>