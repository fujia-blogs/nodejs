# CPU 过载保护设计 - 如何在服务层确保系统的稳定？

1. 什么是过载保护？

这个词最早出现是在电路⽅⾯，在出现短路或者电压承载过⼤时，会触发电源的过载保护设备，该设备要不熔断、要不跳闸切断电源。

服务端的原理与之类似，首先设计一个过载保护的服务，当过载触发时，切断用户服务直接返回报错，在压力恢复时，正常响应用户请求。

2. CPU 过载保护？

在 Node.js 中最⼤的瓶颈在于 CPU，因此我们需要针对 CPU 的过载进⾏保护。当 CPU 使⽤率超出⼀定范围时，进⾏请求熔断处理，直接报错返回。

## 实现方案

1. 几个关键的问题：

- 获取当前进程所在的 CPU 使⽤率的⽅法；
- 应尽量避免影响服务性能；
- 什么时候触发过载，能否减少误处理情况；
- 请求丢弃⽅法和优先级；

2. 获取当前进程下的 CPU 使⽤情况，⽽不是整体机器的 CPU，因此需要使⽤ PS 这个命令，⽽不是利⽤ Node.js 本身的 OS 模块。

```sh
ps -p ${process.pid} -o pid,rss,vsz,pcpu,comm
```

- pid 是进程 ID；
- rss 是实际内存占⽤；
- vsz 是虚拟内存占⽤；
- pcpu 是 CPU 使⽤率；
- comm 是进程执⾏的指令。

### 性能影响

1. node.js 只有一个主线程，**必须严格减少框架在主线程的占用时间，控制框架基础模块的性能损耗，从而将主线程资源更多服务于业务，增强业务并发处理能力。**为了满足这点：

- 只处理需要的数据
- 定时落地 CPU 信息到内存中。

### 概率丢失

1. 在获取 CPU 值以后，我们可以根据当前 CPU 的情况进⾏⼀些丢弃处理，但是应尽量避免出现误处理的情况。⽐如当前 CPU 某个时刻出现了过⾼，但是⽴⻢恢复了，这种情况下我们是不能进⾏丢弃请求的，**直邮当 CPU 长期处于一个高负载情况下才能进行请求丢弃。**

### 优先级处理

1. **优先级问题，**因为一些核心的请求不希望用户在访问时出现丢弃的情况，如：支付或其它核心重要的流程。

2. 其次对于⼀个⽤户，我们允许了该⽤户访问其中⼀个接⼝，那么其他接⼝在短时间内应该也允许请求，不然会导致有些接⼝响应成功，有些失败，那么⽤户还是⽆法正常使⽤。

#### 实现方案

1. 优先级实现最简单的方式，就是接受一个**白名单参数，**如果设置了则会在白名单中请求通过处理，无须校验，如果不在才会进行检查。

2. uuid 处理，⾸先我们需要考虑时效性，如果存储没有时效会导致存储数据过⼤，从⽽引起内存异常问题，其次应该考虑使⽤共享内存 Redis ⽅式。

**tips： 设置缓存上限，超过上限就剔除第一个元素。**

## 要点

1. 随着并发越来越高，如果没有负载保护，用户的处理时长会越来越长，**但是有了负载保护就可以避免雪崩现象，从而保护服务器可以正常地提供服务。**
