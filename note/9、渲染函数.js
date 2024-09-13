/*
Vue 的模板实际上被编译成了渲染函数。
render:渲染虚拟 DOM树
createElement:创建虚拟 DOM
*/
render: function (createElement) {
  return createElement('h1', this.blogTitle)
}
createElement(
  // 一个 HTML 标签名、组件选项对象
  'div',
  // 属性（数据对象）
  {
    'class': {
      foo: true,
      bar: false
    },
    style: {
      color: 'red',
      fontSize: '14px'
    },
    // 普通的 HTML attribute
    attrs: {
      id: 'foo'
    },
    // 组件 prop
    props: {
      myProp: 'bar'
    },
    // 事件监听器在 `on` 内，
    on: {
      click: this.clickHandler
    },
    // 仅用于组件，用于监听原生事件，而不是组件内部使用
    nativeOn: {
      click: this.nativeClickHandler
    },
    // 自定义指令
    directives: [{
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }],
    // 作用域插槽的格式为
    // { name: props => VNode | Array<VNode> }
    scopedSlots: {
      default: props => createElement('span', props.text)
    },
    // 如果组件是其它组件的子组件，需为插槽指定名称
    slot: 'name-of-slot',
    // 其它特殊顶层 property
    key: 'myKey',
    ref: 'myRef',
  },
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)