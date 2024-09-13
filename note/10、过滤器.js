/*
过滤器:
用于一些常见的文本格式化，可分为局过滤器和局部过滤器。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式

<!-- 在双花括号中 -->
{{ message | capitalize }}
<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>

过滤器可以串联：
{{ message | filterA | filterB }}
filterA 被定义为接收单个参数的过滤器函数，表达式 message 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 filterB，将 filterA 的结果传递到 filterB 中。

过滤器可以接收多个参数：
{{ message | filterA('arg1', arg2) }}
message为第一个参数，'arg1' 作为第二个参数，arg2 的值作为第三个参数。
*/
// 局部过滤器
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}

// 全局过滤器
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})