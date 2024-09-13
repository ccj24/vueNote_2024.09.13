/*
1、父组件到子组件
方式：通过子组件props属性来传递数据 props是一个数组
注意：属性的值必须在组件中通过props属性显示指定，否则，不会生效
说明：传递过来的props属性的用法与data属性的用法相同
*/
<div id="app">
  <!-- 如果需要往子组件总传递父组件data中的数据 需要加v-bind="数据名称" -->
  <hello v-bind:msg="info"></hello>
  <!-- 如果传递的是字面量 那么直接写-->
  <hello my-msg="abc"></hello>
</div>


/*
子组件到父组件
方式：父组件给子组件传递一个函数，由子组件调用这个函数
*/
<hello @pfn="parentFn"></hello>
<script>
  Vue.component('hello', {
    template: '<button @click="fn">按钮</button>',
    methods: {
      // 子组件：通过$emit调用
      fn() {
        this.$emit('pfn', '这是子组件传递给父组件的数据')
      }
    }
  })
  new Vue({
    methods: {
      // 父组件：提供方法
      parentFn(data) {
        console.log('父组件：', data)
      }
    }
  })
</script>


/*
非父子组件通讯
在简单的场景下，可以使用一个空的 Vue 实例作为事件总线;
$on()：绑定自定义事件,$emit:触发事件
*/
<!-- 组件A： -->
<com-a></com-a>
<!-- 组件B： -->
<com-b></com-b>

<script>
  // 中间组件
  var bus = new Vue()
  // 通信组件
  var vm = new Vue({
    el: '#app',
    components: {
      comB: {
        template: '<p>组件A告诉我：{{msg}}</p>',
        data() {
          return {
            msg: ''
          }
        },
        created() {
          // 给中间组件绑定自定义事件 注意:如果用到this 需要用箭头函数
          bus.$on('tellComB', (msg) => {
            this.msg = msg
          })
        }
      },
      comA: {
        template: '<button @click="emitFn">告诉B</button>',
        methods: {
          emitFn() {
            // 触发中间组件中的自定义事件
            bus.$emit('tellComB', '土豆土豆我是南瓜')
          }
        }
      }
    }
  })
</script>


/*
获取组件（或元素） - refs
说明：vm.$refs 一个对象，持有已注册过 ref 的所有子组件（或HTML元素）
使用：在 HTML元素 中，添加ref属性，然后在JS中通过vm.$refs.属性来获取
注意：如果获取的是一个子组件，那么通过ref就能获取到子组件中的data和methods
*/
<div id="app">
  <div ref="dv"></div>
  <my res="my"></my>
</div>

<!-- js -->
<script>
  new Vue({
    el : "#app",
    mounted() {
      this.$refs.dv //获取到元素
      this.$refs.my //获取到组件
    },
    components : {
      my : {
        template: `<a>sss</a>`
      }
    }
  })
</script>