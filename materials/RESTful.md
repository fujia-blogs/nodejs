# RESTful

1，RESTful 是一种架构的**约束条件**和**规则**

## MSVC

1，MSVC 架构

[架构模式](assets/images/MSVC-architecture-model.jpg)

2，model 和 controller 分析

[M 和 C 逻辑分析](assets/images/model-controller-analyse.jpg)

### MVC

1，实现⼀个 Controller，为了合理性，我们先实现⼀个基类，然后让每个 Controller 继承这个基类：

- 在项⽬根⽬录下我们创建⼀个 core ⽂件夹，并创建⼀个 Controller.js 作为基类
- 然后我们把⼀些相同的功能放⼊这个基类，⽐如 res 和 req 的赋值，以及通⽤返回处理，还有 url 参数解析等
