/*
混入 (mixin) ：
提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。
一个混入对象可以包含任意组件选项。
当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。（同名选项也会合并，发生冲突时以组件数据优先;同名钩子函数将合并为一个数组，混入对象的钩子将在组件自身钩子之前调用。）
*/
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  },
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => "混入对象的钩子被调用"
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})


/*
全局混入:
影响每一个之后创建的 Vue 实例
*/
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"