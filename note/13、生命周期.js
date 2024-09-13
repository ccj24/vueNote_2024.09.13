/*
生命周期:
一个组件从开始到最后消亡所经历的各种状态，就是一个组件的生命周期
生命周期钩子函数：
从组件被创建，到组件挂载到页面上运行，再到页面关闭组件被卸载，这三个阶段总是伴随着组件各种各样的事件，这些事件，统称为组件的生命周期函数

beforeCreate()
说明：在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
注意：此时，无法获取 data中的数据、methods中的方法

-- 数据观测 (data observer) 和 event/watcher 事件配置,数据初始化和响应式处理

created()
注意：可以调用methods中的方法、改变data中的数据

beforeMounted()
说明：在挂载开始之前被调用（此处render函数生成虚拟DOM，但未转换成真实DOM并替换el)

-- 挂载 (el优先级比template高)

mounted()
说明：此时，vue实例已经挂载到页面中，可以获取到el中的DOM元素，进行DOM操作

beforeUpdated()
说明：数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
注意：此处获取的数据是更新后的数据，但是获取页面中的DOM元素是更新之前的

-- 虚拟 DOM 重新渲染和打补丁

updated()
说明：组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作

activated()
说明：被keep-alive缓存的组件激活时调用

deactivated()
说明：被keep-alive缓存的组件停用时调用

beforeDestroy()
说明：实例销毁之前调用。在这一步，实例仍然完全可用。
使用场景：实例销毁之前，执行清理任务，比如：清除定时器等

-- 解绑实例上的属性、移除事件监听器、销毁子实例

destroyed()
说明：Vue 实例销毁后调用。
*/