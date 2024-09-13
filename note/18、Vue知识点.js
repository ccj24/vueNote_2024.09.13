/*
为什么data是个函数并且返回一个对象呢？
一个组件可能会多处调用，而每一次调用就会执行data函数并返回新的数据对象，这样，可以避免多处调用之间的数据污染。

父子组件生命周期顺序：
父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted

对象新属性无法更新视图，删除属性无法更新视图？
原因：Object.defineProperty没有对对象的新属性进行属性劫持
对象新属性无法更新视图：使用Vue.$set(obj, key, value)，组件中this.$set(obj, key, value)
删除属性无法更新视图：使用Vue.$delete(obj, key)，组件中this.$delete(obj, key)

直接arr[index] = xxx无法更新视图怎么办？
原因：Vue没有对数组进行Object.defineProperty的属性劫持，所以直接arr[index] = xxx是无法更新视图的
使用数组的splice方法，arr.splice(index, 1, item)，或使用Vue.$set(arr, index, value)

Vue.set、Vue.delete方法：
*/
function set(target, key, val) {
  if (Array.isArray(target)) { // 数组
    target.length = Math.max(target.length, key) // 判断是否应该扩展数组长度
    target.splice(key, 1, val) // 替换
    return val
  } else {
    const ob = target.__ob__ // 获取对象Observer属性，不存在则说明不是响应式对象
    if (key in target && !(key in target.prototype) || !ob) { // 该属性是对象已有属性或该对象不是响应式对象
      target[key] = val
      return val
    }
    defineReactive(target, key, val) // 否则，新增属性，并响应式处理
    return val
  }
}

function del(target, key) {
  if (Array.isArray(target)) { // 数组
    target.splice(key, 1) // 删除
    return
  } else {
    const ob = target.__ob__ // 获取对象Observer属性，不存在则说明不是响应式对象
    if (!(key in target)) return// 对象本身就没有这个属性，直接返回
    delete target[key]// 否则，删除这个属性

    if (!ob) return// 判断是否是响应式对象，不是的话，直接返回
    ob.dep.notify()// 是的话，删除后要通知视图更新
  }
}

/*
不需要响应式的数据应该怎么处理？
数据量大的死数据，不需要做响应式处理，否则会消耗大量性能。
*/
// 方法一：将数据定义在data之外
data() {
  this.list1 = {
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  }
  return {}
}

// 方法二：Object.freeze()
data() {
  return {
    list1: Object.freeze({
      xxxxxxxxxxxxxxxxxxxxxxxx
    }),
  }
}


/*
nextTick的用处:
Vue采用的是异步更新（数据更新，视图没更新）的策略，同一事件循环内多次修改会统一进行一次视图更新，从而节省性能；
想要拿到最新视图数据 this.$nextTick(() => {})

computed如何实现传参？
*/
// html
<div>{{ total(3) }}</div>
// js
computed: {
    total() {
      return function(n) {
          return n * this.num
         }
    },
  }


/*
provide和inject是响应式的吗？
value 是引用类型才能实现响应式，基本类型，就无法实现响应式

相同的路由组件如何重新渲染？
<router-view :key="$route.path"></router-view>

如何将获取data中某一个数据的初始状态？
this.$options.data().XXX

Vue的el属性和$mount优先级？
el优先级 > $mount
*/
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#ggg')

/*
计算变量时，methods和computed哪个好？
computed会好一些，因为computed会有缓存。例如index由0变成1，那么会触发视图更新，这时候methods会重新执行一次，而computed不会，因为computed依赖的两个变量num和price都没变。
*/
<div>
    <div>{{howMuch1()}}</div>
    <div>{{howMuch2()}}</div>
    <div>{{index}}</div>
</div>

data: () {
    return {
         index: 0
       }
     }
methods: {
    howMuch1() {
        return this.num + this.price
    }
  }
computed: {
    howMuch2() {
        return this.num + this.price
    }
  }
