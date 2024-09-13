/*
计算属性computed：
计算复杂逻辑，以声明式创建依赖关系，基于它们的响应式依赖(data里面的属性)进行缓存的,当依赖改变时，则重新计算；否则使用缓存的值

如果函数中没有出现 data 中的属性，那么无论 data 中的属性怎么变，a 对应的函数一次也不会执行。
计算属性默认只有 getter，不过在需要时你也可以提供一个 setter
侦听器：观察和响应 Vue 实例上的数据变动
computed中的属性不能与data中的属性同名，否则会报错
*/
// 当this.message变化才会重新计算
computed: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('') // `this` 指向 vm 实例
  }
}
// 只计算一次，不再更新
computed: {
  now: function () {
    return Date.now()
  }
}
// 重新渲染则会重新计算
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}

computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {// 运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}


