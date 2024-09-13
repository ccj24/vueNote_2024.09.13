/*
watch:
监视数据变化,watch是一个对象，键是需要观察的表达式，值是对应回调函数。当表达式的值发生变化后，会调用对应的回调函数完成响应的监视操作

handler：处理函数
deep : 是否监听对象内部属性值的变化 
immediate: 是否立即以表达式的当前值触发回调,初始化是否立即执行一次回调
*/
watch: {
  a: function (val, oldVal) {
    console.log('当前值为：' + val, '旧值为：' + oldVal)
  },
  // 监听对象属性的变化
  b: {
    handler: function (val, oldVal) {
      /* ... */ },
    deep: true // deep : true表示是否监听对象内部属性值的变化 
  },
  // 只监视user对象中age属性的变化
  'user.age': function (val, oldVal) {},
}

watch: {
  firstName(val) {
    setTimeout(() => {// 异步操作
      console.log(this)
      this.fullName = val + '-' + this.lastName
    }, 1000);
  },
  lastName(val) {
    this.fullName = this.firstName + '-' + val
  }
}