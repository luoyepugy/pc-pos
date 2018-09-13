<template>
  <div class="view-system-app">
    <crumb :list="crumbList"></crumb>
    <div class="content">
      <div class="content-filter">
        <Select v-model="status" style="width:200px">
          <Option v-for="item in statusList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
        </Select>
        <Input search placeholder="请输入系统编号/系统代码/系统名称" />
      </div>
      <div class="content-table">
        <Table class="cp-table-full" :loading="table.loading" :columns="table.columns" :data="table.data"></Table>
        <Page :total="json.total" show-sizer show-total show-elevator />
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import consts from '@/utils/consts';
import Rest from '@/rest';
import Helper from '@/helper';
import json from '@/json/demo1.json';

export default {
  data() {
    return {
      crumbList: [{
        name: '系统设置',
      }, {
        name: '应用管理'
      }],
      statusList: consts.SYSTEM_STATUS_ALL,
      status: 2,
      table: {
        loading: true,
        columns: [{
            title: '系统编号',
            key: 'appNo'
          },
          {
            title: '系统代码',
            key: 'code'
          },
          {
            title: '系统名称',
            key: 'name'
          }, {
            title: '系统描述',
            key: 'description'
          },
          {
            title: '系统状态',
            key: 'status',
            render: (h, params) => {
              return h('span', Helper.fieldMapping(params.row.status, consts.SYSTEM_STATUS));
            }
          },
          {
            title: 'url',
            key: 'url'
          }
        ],
        data: [],
        json: {},
      },
    }
  },
  created() {
    this.getTableDatas();
    this.json = json;
  },
  methods: {
    getTableDatas() {
      // $.getJSON(, res => {
      // Rest.get('json/demo1.json').done(res => {
      // if (Helper.isSuccess(res)) {
      this.table.data = json.rows;
      this.table.loading = false;
      // } else {
      //   this.$Message.error(res.status.msg);
      // }
      // });
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>