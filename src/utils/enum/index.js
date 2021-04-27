import { Enum } from "./Enum";

/**
 * 全局公共枚举类
 */
export default {
  // 指令类型
  commandEnum: new Enum()
    .add("charge", "进料", 1)
    .add("mix", "混料", 2)
    .add("discharge", "出料", 3)
    .add("move", "移料", 4)
    .add("in2outMaterial", "进料口出料", 5),
  // 行车卡片状态
  hcStatusEnum: new Enum()
    .add("disconnect", "通讯断开", 0)
    .add("offline", "脱机", 1)
    .add("standby", "待机", 2)
    .add("operation", "作业", 3)
    .add("fault", "故障", 4),
  // 行车任务状态类型
  taskStatusEnum: new Enum()
    .add("execute", "执行中", 1)
    .add("waiting", "等待激活", 2)
    .add("activated", "激活", 3),
  // ResultEnum: new Enum().add('SUCCESS', '操作成功', 200).add('ERROR', '操作失败', 400).add('PARAM_ERROR', '参数错误', 405).add(
  // 		'SERVER_ERROR', '服务器异常', 500)
  // 	.add('NO_PERMISSION', '没有权限', 501)
};
