# 古风状态栏 · 通用前端模板

> 来源：桃花项目「白蛇传」（双角色）与「梅卿」（单角色+时空切片）两张卡状态栏的提炼统一版。
> 位置：`cards/前端模板/状态栏模板.html`
> 适用：SillyTavern + 酒馆助手 + MVU Zod 变量的古风角色卡状态栏

---

## 一、模板特性（相对两卡的统一改进）

| 特性 | 说明 |
|---|---|
| **配置驱动** | 只改 `CONFIG` 区即可适配新卡，无需改渲染逻辑 |
| **统一服饰路径约定** | `prefix = 角色键名`，内部固定拼 `.服饰.`——消除"路径少跳一层"历史 bug 隐患 |
| **safeGet 安全读取** | 自动剥离 `stat_data.` 前缀 + 空值降级，读空显示 `--` 而非整区空白 |
| **双系统变量模式** | `sysMode: 'flat'`（白蛇传平铺）/ `'nest'`（梅卿容器） |
| **多角色扩展** | 复制 HTML 角色区块 + CONFIG.chars 加一项即可 |
| **事件驱动刷新** | `waitGlobalInitialized('Mvu')` + `VARIABLE_UPDATE_ENDED` 重绘 |

---

## 二、适配新卡步骤

### 1. 改 CONFIG（脚本顶部）

```js
var CONFIG = {
  title: '◆ 卡名 ◇',
  footer: '—— 卡名 ——',
  sysMode: 'flat',            // 'flat' 顶层平铺 | 'nest' 系统变量容器
  chars: [
    { key: '角色键名', id: 'c1', name: '显示名', hasAff: true },
    // { key: '角色2', id: 'c2', name: '显示名2', hasAff: true },
  ],
};
```

### 2. 调整 HTML 角色区块

- **单角色**：保留 `gf-c1-*` 区块，删除注释掉的 `gf-c2-*` 区块。
- **双角色**：取消 `gf-c2-*` 区块注释。
- **无好感度**：删除该角色的 `.gf-aff` 整块，并在 CONFIG 设 `hasAff: false`。

### 3. 调整头部 meta

- `sysMode:'flat'` → 读 `当前时间/当前年月/天气`（白蛇传式）。
- `sysMode:'nest'` → 读 `系统变量.时间段/日期`，天气列显示 `--`（梅卿式，可自行改字段）。

### 4. 主题色

CSS 顶部变量 `--cinnabar/--ochre/--jade/--plum/--paper` 按卡色系调整（如梅卿可换梅红主色）。

---

## 三、关键约定（防复发）

1. **服饰路径**：调用 `renderClothes(d, '角色名', 'gf-c1-clothes')`，**不要把 `.服饰` 拼进 prefix**——函数内部已拼 `.服饰.`。
2. **schema 层级对齐**：读取路径深度必须与 schema 嵌套一致（`角色.服饰.子键` 三级）。
3. **双写同步**：改完 `状态栏模板.html` 后，嵌入到具体卡 JSON 时记得同步 `regex_scripts` 的 `replaceString`。
4. **数据层 vs 渲染层**：schema `prefault` 兜数据，兜不了渲染路径错误；渲染层读空要用 `safeGet` 留痕（`--`）。

---

## 四、参考实现

- 双角色实例：`cards/白蛇传/正则/状态栏界面.html`
- 单角色+时空：`cards/梅卿/正则/状态栏界面.html`
