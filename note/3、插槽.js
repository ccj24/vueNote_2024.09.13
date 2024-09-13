/*
插槽：
内容分发的API、将<slot>元素作为承载分发内容的出口

// 父组件
<navigation-link url="/profile">
  Your Profile
</navigation-link>

// 子组件
<a
  v-bind:href="url"
  class="nav-link"
>
  <slot></slot> // 当组件渲染的时候，<slot></slot> 将会被替换为“Your Profile”,如果没有<slot>元素，则内容会抛弃。插槽内可以包含任何模板代码，包括 HTML
</a>
*/


/*
默认内容：
只会在没有提供内容的时候被渲染。
<button type="submit">
  <slot>Submit</slot>  // 当不提供任何插槽内容时，渲染Submit；否则渲染父组件提供的内容
</button>
*/


/*
具名插槽:
<slot> 元素有一个特殊的属性name,默认是default；父组件可以在<template> 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称；
任何没有被包裹在带有 v-slot 的 <template> 中的内容都会被视为默认插槽的内容。

<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<base-layout>
  <template v-slot:header> // 使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称；v-slot:可缩写为#
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  // 同上
  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>

<base-layout>
  <template v-slot:[dynamicSlotName]> // 动态插槽名
    ...
  </template>
</base-layout>
*/



/*
编译作用域:
在插槽中使用数据时，该插槽跟模板的其它地方一样可以访问相同的实例 property (也就是相同的“作用域”)，而不能访问 <navigation-link> 的作用域。
父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
*/
<navigation-link url="/profile">
  {{ url }} // undefined
</navigation-link>


/*
作用域插槽:
使插槽中能访问子组件的数据，可以在<slot>元素上绑定

<span>
  <slot v-bind:user="user"> // 插槽 prop
    {{ user.lastName }}
  </slot>
</span>

<current-user>
  <template v-slot:default="slotProps"> // 使用带值的 v-slot 来定义我们提供的插槽 prop 的名字,slotProps可替换为任何命名
    {{ slotProps.user.firstName }}
  </template>
</current-user>

<current-user>
  <template v-slot="{ user }"> // 解构插槽 Prop、default可省略
    {{ user.firstName }}
  </template>
</current-user>
*/