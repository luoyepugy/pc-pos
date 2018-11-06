<template>
  <div>
    <Crumb :list="crumbList"></Crumb>
    <GridTable :filter-type="['status']" table-api="get:app" filter-ph="请输入系统编号/系统代码/系统名称" :table-columns="table.columns"></GridTable>
    <!-- <div class="content">
      <div class="content-filter">
        <Select v-model="status" style="width:200px">
          <Option v-for="item in statusList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
        </Select>
        <Input search placeholder="请输入系统编号/系统代码/系统名称" />
      </div>
      <div class="content-table">
        <Table class="cp-table-full" :loading="table.loading" :columns="table.columns" :data="table.data"></Table>
        <Page @on-change="pageChange" @on-page-size-change="pageSizeChange" :total="page.total" show-sizer show-total show-elevator />
      </div>
    </div> -->
  </div>
</template>
<script type="text/ecmascript-6">
import consts from '@/utils/consts';
import Rest from '@/rest';
import api from '@/api';
import { helper } from '@/helper';

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
            fieldMapping: 'system_status'
          },
          {
            title: 'url',
            key: 'url'
          }
        ],
        data: [],
      },
      page: {
        total: 0,
        size: 10,
        index: 1,
      },
    }
  },
  created() {
    // this.getTableDatas();
  },
  methods: {
    // pageChange(page) {
    //   this.page.index = page;
    //   console.log(page);
    // },
    // pageSizeChange(size) {
    //   this.page.size = size;
    //   console.log(size);
    // },
    // getTableDatas() {
    //   Rest.get(api.system.app.list).done(res => {
    //     if (helper.isSuccess(res)) {
    //       this.table.data = res.rows;
    //       this.page.total = res.total;
    //       this.table.loading = false;
    //     } else {
    //       this.$Message.error(res.status.msg);
    //     }
    //   });
    // }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>