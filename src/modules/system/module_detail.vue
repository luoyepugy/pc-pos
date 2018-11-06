<template>
  <div>
    <Crumb :list="crumbList"></Crumb>
    <div class="content">
      <div class="content-filter">
        <DropToSelect :list="statusList" @on-change="changeStatus"></DropToSelect>
        <DatePicker confirm v-model="date" @on-ok="selectDate" type="daterange" placement="top-start" placeholder="请选择日期范围" format="yyyy/MM/dd"></DatePicker>
        <div class="button-group">
          <Button class="c-button" @click="contract.modal=true">设置</Button>
          <Button type="primary" class="c-button" @click="addTableItem">新增</Button>
        </div>
      </div>
      <div class="content-table">
        <Table :columns="table.columns" :data="table.data"></Table>
      </div>
    </div>
    <!-- 设置模态框 -->
    <Modal :width="800" :mask-closable="false" title="待商务准备合同设置" v-model="contract.modal" @on-ok="saveContract">
      <Table ref="contract.table" :loading="contract.table.loading" :columns="contract.table.columns" :data="contract.table.data"></Table>
      <div slot="footer">
        <Button class="c-button" @click="cancelContract">取消</Button>
        <Button class="c-button" type="primary" @click="saveContract">确定</Button>
      </div>
    </Modal>
    <!-- /设置模态框 -->
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
        name: '模块管理',
        path: '/system/module'
      }, {
        name: '模块详情'
      }],
      statusList: consts.SYSTEM_STATUS_ALL,
      status: 2,
      statusText: '全部状态',
      table: {
        columns: [{
            title: '系统名称',
            key: 'name',
            render: (h, params) => {
              return h('Input', {
                props: {
                  type: 'text',
                  value: params.row.name
                }
              });
            }
          }, {
            title: '系统描述',
            key: 'description',
            render: (h, params) => {
              return h('Input', {
                props: {
                  type: 'text',
                  value: params.row.description
                }
              });
            }
          },
          {
            title: '系统状态',
            key: 'status',
            render: (h, params) => {
              let options = consts.SYSTEM_STATUS.map((value, index) =>
                h('Option', {
                  props: {
                    value: value.Id,
                    clearable: true
                  }
                }, value.name)
              );
              return h('Select', options);
            }
          },
          {
            title: 'url',
            key: 'url',
            render: (h, params) => {
              return h('Input', {
                props: {
                  type: 'text',
                  value: params.row.description
                }
              });
            }
          },
          {
            title: '操作',
            key: 'operations',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.table.data.splice(params.index, 1);
                  }
                }
              }, '删除')
            }
          }
        ],
        data: [],
      },
      date: '',
      contract: {
        modal: false,
        table: {
          loading: true,
          columns: [{
              title: '系统名称',
              key: 'name',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    type: 'text',
                    value: params.row.name
                  }
                });
              }
            },
            {
              title: '系统状态',
              key: 'status',
              render: (h, params) => {
                let options = consts.SYSTEM_STATUS.map((value, index) =>
                  h('Option', {
                    props: {
                      value: value.Id,
                    }
                  }, value.name)
                );
                return h('Select', {
                  props: {
                    value: params.row.status
                  },
                  on: {
                    'on-change': (val) => {
                      this.contract.table.data[params.index].status = val;
                    }
                  }
                }, options);
              }
            },
            {
              title: 'url',
              key: 'url',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    type: 'text',
                    value: params.row.url
                  }
                });
              }
            }
          ],
          data: [],
        },
      },
    }
  },
  created() {
    this.getTableDatas();
  },
  methods: {
    changeStatus(id) {
      this.status = id;
    },
    getTableDatas() {
      Rest.get(api.system.app.list).done(res => {
        if (helper.isSuccess(res)) {
          this.contract.table.data = res.rows;
          this.contract.table.loading = false;
        } else {
          this.$Message.error(res.status.msg);
        }
      });
    },
    saveContract() {
      this.contract.modal = false;
    },
    cancelContract() {
      this.contract.modal = false;
    },
    selectDate() {
      console.log(helper.formatDate(this.date[0]));
    },
    addTableItem() {
      this.table.data.push({
        name: '',
        description: '',
        status: 0,
        url: ''
      });
    }
  },
  activated() {
    console.log(this.$route.params.id);
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>