// 只支持字符串或数组
const TITLE = '案场管家'; // 网站标题

// 系统状态
const SYSTEM_STATUS = [
  { 'Id': 0, 'name': '无效' },
  { 'Id': 1, 'name': '有效' }
];

// 所属系统
const SYSTEM_NAME = [
  { 'Id': 1, 'name': '滔博运动城门店系统' },
  { 'Id': 2, 'name': '报表系统' },
  { 'Id': 3, 'name': '财务辅助系统' },
  { 'Id': 11, 'name': '后端管理系统' },
  { 'Id': 5, 'name': '营促销' },
  { 'Id': 60, 'name': '卡券' },
  { 'Id': 7, 'name': '招商管理' },
  { 'Id': 8, 'name': '店铺主数据' },
  { 'Id': 9, 'name': '自收银系统' },
];

const SYSTEM_STATUS_ALL = [{ 'Id': 2, 'name': '全部状态' }].concat(SYSTEM_STATUS);
const SYSTEM_NAME_ALL = [{ 'Id': 0, 'name': '全部系统' }].concat(SYSTEM_NAME);

// 菜单类型
const MENU_TYPE = [
  { 'Id': 0, 'name': '默认' },
  { 'Id': 1, 'name': '后台管理' }
];

// 菜单权限
const MENU_PERMISSION = [
  { 'Id': 1, 'name': '浏览' },
  { 'Id': 2, 'name': '新增' },
  { 'Id': 3, 'name': '编辑' },
  { 'Id': 4, 'name': '删除' },
  { 'Id': 5, 'name': '导出' },
  { 'Id': 8, 'name': '确认' },
  { 'Id': 10, 'name': '审核' },
  { 'Id': 17, 'name': '作废' },
  { 'Id': 19, 'name': '重置' },
  { 'Id': 21, 'name': '启用' },
  { 'Id': 22, 'name': '禁用' },
  { 'Id': 26, 'name': '确认' },
  { 'Id': 27, 'name': '保存' },
  { 'Id': 28, 'name': '清退' },
  { 'Id': 32, 'name': '生成销售码' },
  { 'Id': 62, 'name': '日志' }
];


export default {
  TITLE,
  SYSTEM_STATUS,
  SYSTEM_STATUS_ALL,
  SYSTEM_NAME,
  SYSTEM_NAME_ALL,
  MENU_TYPE,
  MENU_PERMISSION,
}
