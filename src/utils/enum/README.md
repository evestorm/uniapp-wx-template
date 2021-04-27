# 枚举工具类

## 用法

在 `index.js` 中导入：

```js
// 落户任务状态
settleTaskStatusEnum: new Enum()
  .add("ALL", "全部", null)
  .add("SETTLE", "待落户", 0)
  .add("SETTLED", "已落户", 1)
  .add("CANCEL", "已取消", 2);
```

如需要表单选择可如下使用：

```html
<el-select style="width: 99%;" v-model="query.taskStatus" clearable placeholder="请选择">
  <-- 传统做法 -->
  <el-option value="0" :label="待落户 "></el-option>
  <el-option value="1" :label="已落户 "></el-option>
  <el-option value="2" :label="已取消"></el-option>

  <-- 基于枚举类的方法 -->
  <el-option
    v-for="item in enums.settleTaskStatusEnum"
    :key="item.value"
    :value="item.value"
    :label="item.label"
  ></el-option>
</el-select>
```

如需页面以及 table 显示枚举 label 可如下使用：

```html
<!-- 可以避免为每个枚举值进行判断后，再取其label，后端返回taskStatus:1 -->
<el-table-column prop="taskStatus" label="任务状态">
  <template slot-scope="scope">
    <!-- 传统做法：定义function通过switch或者if判断并返回label -->
    {{ switch(scope.row.taskStatus) case 0:... case 1... case 2.... }}
    <!-- 基于枚举类的方法 -->
    {{ enums.settleTaskStatusEnum.getLabelByValue(scope.row.taskStatus) }}
  </template>
</el-table-column>
```

如需根据枚举值判断可如下使用：

```js
// 只能对【待落户】的数据点击
// 传统做法（硬编码）
if (item.taskStatus === 1) {
  this.settleBtnDisabled = false;
}
// 基于枚举类方法，可以防止硬编码
if (item.taskStatus === enums.settleTaskStatusEnum.SETTLE.value) {
  this.settleBtnDisabled = false;
}
```
