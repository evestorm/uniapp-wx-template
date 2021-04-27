/**
 * @description 枚举类
 */
export class Enum {
  /**
   * 添加枚举字段
   * field: 枚举字段
   * label: 界面显示
   * value: 枚举值
   * className: 类名
   */
  add(field, label, value, className = "") {
    // 如果className没传，则默认设置为field
    if (className == "") className = field;
    this[field] = { label, value, className };
    return this;
  }

  /**
   * @description 根据枚举value获取其label
   */
  getLabelByValue(value) {
    // 字段不存在返回‘’
    if (value === undefined || value === null) return "";
    for (const [, val] of Object.entries(this)) {
      if (val.value === value) {
        return val.label;
      }
    }

    return "";
  }

  /**
   * @description 根据field找value
   * @param field field字段
   */
  getValueByField(field) {
    // field不存在返回‘’
    if (field === undefined || field === null) return "";
    for (const [key, val] of Object.entries(this)) {
      if (key === field) {
        return val.value;
      }
    }

    return "";
  }

  /**
   * @description 根据枚举value获取其label和className
   */
  getLabelAndClassNameByValue(value) {
    // 字段不存在返回‘’
    if (value === undefined || value === null) {
      return {
        className: "",
        label: "",
      };
    }
    for (const [, val] of Object.entries(this)) {
      if (val.value === value) {
        return {
          className: val.className,
          label: val.label,
        };
      }
    }

    return {
      className: "",
      label: "",
    };
  }
}
