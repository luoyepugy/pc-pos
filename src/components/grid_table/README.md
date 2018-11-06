# Grid Table 高级筛选表格
> 附带分页、筛选、删除行、可配置列的通用表格组件 by张晗

## 获取
``` bash
tccm get grid_table@0.0.1
```

## 依赖

该组件依赖vue.js, jQuery.js, rest.js, helper.js, consts.js这5个文件，如果你是在最新的后台开发框架上，则可完美使用。

## 使用说明

```html
<template>
  <grid-table
    :filter-type="['status', 'sysname']"
    filter-ph="请输入..."
    table-api="get:api/v1/budget/index"
    :table-columns="columns"
    operable
    checkable
    :on-edit-click="moduleEdit"
    :on-detail-click="moduleDetail"
    :on-delete-click="moduleDelete"
  >
    <!-- 组件右上角自定义按钮 -->
    <div slot="grid-right-button">
      <Button type="success" @click="create">+ 新建指标</Button>
      <Button type="success" @click="export">导出</Button>
    </div>
    <!-- 组件左上角隐藏图标自定义按钮 -->
    <div slot="grid-icon-button">
      <span class="button" @click="export"><Icon type="ios-trash-outline" size="22" />提交</span>
    </div>
    <!-- 组件左上角自定义表单域 -->
    <div slot="grid-filter-field">
      <Select v-model="sysname" style="width:200px">
        <Option v-for="item in sysnameList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
      </Select>
    </div>
  </grid-table>
</template>

<script>
  import GridTable from '@/components/grid_table/grid_table'

  export default {
    data() {
      return {
        columns: [{
            title: '模块编号',
            key: 'moduleNo',
            width: 100,
            disabled: true,
          }, {
            title: '系统名称',
            key: 'appNo',
            width: 150,
            fieldMapping: 'system_name',
          }, {
            action: 'operate',
            buttons: [{
              name: 'edit',
              icon: 'ios-create-outline',
              text: '编辑'
            }, {
              name: 'detail',
              icon: 'ios-document-outline',
              text: '详情'
            }, {
              name: 'delete',
              icon: 'ios-trash-outline',
              text: '删除'
            }
        ]
      }
    },
    methods: {
      // 操作列编辑按钮点击事件
      moduleEdit () {
        // Do something...
      },
      // 操作列详情按钮点击事件
      moduleDetail () {
        // Do something...
      },
      // 操作列删除按钮点击事件
      moduleDelete () {
        // Do something...
      },
      create () {
        // 新建指标，Do something...
      },
      export () {
        // 导出，Do something...
      }
    },
    components: {
      GridTable
    }
  }
</script>
```

## 参数说明

### filter-type

Type: `Array`

表格左上角筛选下拉框，'status'为状态, 'sysname'为系统名称
eg:
如果左上角需要显示`状态`及`系统名称`下拉框，则传入`['status','sysname']`即可

### filter-ph

Type: `string`

表格左上角搜索框占位符,默认为'请输入...'

### table-api

Type: `string`

表格数据 - 数据源(api地址),默认请求方式为post
eg:
如果一个获取的api为 `xxx.com?indexIds=1,2,3`，其中 `1,2,3` 为表格数据的id字段值，则传入 `get:xxx.com?indexIds=id` 即可

### checkable

Type: `Boolean`

是否显示复选框列。无该属性，则表格行不可多选操作


### opearable

Type: `string`

是否显示操作列。无该属性，则表格不显示操作列（固定的最后一列）

### on-edit-click

Type: `function`

表格操作列下拉菜单中的按钮事件，定义在table-columns属性中的buttons数组中，由`on-`+ buttons数组每项中的name值 +`-click`组成事件名称，参数为操作的当前行的数据row

