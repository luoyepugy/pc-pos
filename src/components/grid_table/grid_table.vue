<template>
  <div>
    <div class="content">
      <!-- 表格筛选项 -->
      <div class="content-filter" v-show="!operateItems.show">
        <Select v-show="filterType.includes('status')" v-model="status" style="width:200px">
          <Option v-for="item in statusList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
        </Select>
        <Select v-show="filterType.includes('sysname')" v-model="sysname" style="width:200px">
          <Option v-for="item in sysnameList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
        </Select>
        <slot name="grid-filter-field"></slot>
        <Input search v-model="searchText" :placeholder="filterPh" @on-search="getTableDatas" />
        <div class="button-group">
          <slot name="grid-right-button"></slot>
        </div>
      </div>
      <div class="content-toolbar" v-show="operateItems.show">
        <span class="button" @click="filterIconClose"><Icon type="ios-close" size="30" /></span>
        <span class="label">已选择<b class="number">{{operateItems.number}}</b>项</span>
        <slot name="grid-icon-button"></slot>
        <span class="button" @click="modal.del=true"><Icon type="ios-trash-outline" size="22" />删除</span>
      </div>
      <!-- /表格筛选项 -->
      <div class="content-table">
        <span v-if="table.data.length>0&&operable" @click="table.fields.isShow=true" class="cp-color-hover icon-filter-column"><Icon type="ios-options-outline" size="24"></Icon></span>
        <Table class="cp-table-full" ref="table" @on-selection-change="tableSelectChange" :loading="table.loading" :columns="table.columns" :data="table.data"></Table>
        <Page @on-change="pageIndexChange" @on-page-size-change="pageSizeChange" :total="page.total" show-sizer show-total show-elevator />
      </div>
      <!-- 选择显示字段 -->
      <GridFilter @change="columnChange" :fields="table.fields"></GridFilter>
      <!-- /选择显示字段 -->
    </div>
    <!-- 删除模态框 -->
    <Modal :mask-closable="false" title="提示" v-model="modal.del">
      确定要删除吗？
      <div slot="footer">
        <Button @click="cancelDelete">取消</Button>
        <Button type="primary" @click="confirmDelete">确定</Button>
      </div>
    </Modal>
    <!-- /删除模态框 -->
  </div>
</template>
<script type="text/ecmascript-6">
import consts from '@/utils/consts';
import Rest from '@/rest';
import { helper } from '@/helper';
import api from '@/api';
import GridFilter from './grid_filter.vue';

export default {
  data() {
    return {
      searchText: '',
      statusList: consts.SYSTEM_STATUS_ALL,
      status: 2,
      sysnameList: consts.SYSTEM_NAME_ALL,
      sysname: 0,
      page: {
        total: 0,
      },
      modal: {
        del: false,
      },
      operateItems: {
        show: false,
        number: 0,
      },
      table: {
        fields: {
          isShow: false,
          columns: this.getTheadColumns(),
          default: this.getDefaultColumns(),
        },
        loading: true,
        columns: [],
        data: [],
        selectedArr: [],
        curRow: {},
      },
      params: {
        pageSize: 0, // 每页显示数量
        pageIndex: 0, // 当前页数
        pageTotal: 0, // 页数总量
      },
    }
  },
  components: {
    GridFilter,
  },
  props: {
    // toolbar-搜索框placeholder
    filterPh: {
      type: String,
      default: '请输入...'
    },

    // toolbar-下拉框数组
    filterType: {
      type: Array,
      default: () => []
    },

    // 获取表格数据接口api
    tableApi: {
      type: String,
      default: ''
    },

    // table-columns表格列配置
    tableColumns: {
      type: Array,
      default: () => []
    },

    // table-是否有复选框
    checkable: {
      type: Boolean,
      default: false
    },

    // table-是否有操作列
    operable: {
      type: Boolean,
      default: false
    }

  },
  watch: {
    status() {
      this.getTableDatas();
    },
    sysname() {
      this.getTableDatas();
    }
  },
  created() {
    this.getTableDatas();
  },
  methods: {
    columnChange(checkedData, data) {
      this.table.columns = checkedData;
    },
    getTheadColumns() {
      let columns = {};
      const _this = this;

      // 存在复选框列
      if (this.checkable) {
        columns.checkbox = {
          type: 'selection',
          width: 60,
          align: 'center',
        }
      }

      // 存在操作列
      if (this.operable) {
        columns.operate = {
          title: ' ',
          key: 'operate',
          width: 50,
          fixed: 'right',
          align: 'center',
        }
      }
      // console.log(columns.operate);

      // 其他自定义列
      this.tableColumns.forEach((v) => {
        if (v.fieldMapping) {
          v.render = function(h, params) {
            return h('span', helper.fieldMapping(params.row[v.key], consts[v.fieldMapping.toUpperCase()]));
          }
        }

        if (v.action == 'operate') {
          columns.operate.render = function(h, params) {
            let items = v.buttons.map((t) => {
              return h('DropdownItem', {
                props: {
                  name: t.name
                }
              }, [h('Icon', {
                  props: {
                    type: t.icon,
                    size: '20'
                  }
                }),
                t.text
              ]);
            });
            return h('div', [
              h('Dropdown', {
                props: {
                  transfer: true,
                  placement: 'bottom-end'
                },
                on: {
                  'on-click': (name) => {
                    switch (name) {
                      case 'delete':
                        _this.modal.del = true;
                        _this.table.curRow = params.row;
                        break;
                      default:
                        _this.$emit('on-' + name + '-click', params.row);
                        break;
                    }
                  }
                }
              }, [
                h('div', {
                  class: {
                    'icon-ellipsis': true,
                    'cp-color-hover': true
                  }
                }, [
                  h('Icon', {
                    props: {
                      type: 'ios-more',
                      size: '24'
                    }
                  })
                ]),
                h('DropdownMenu', {
                  slot: 'list'
                }, items)
              ])
            ])
          }
        } else {
          columns[v.title] = v;
        }

      });
      // console.log(columns);
      return columns;
    },
    getDefaultColumns() {
      const columns = this.tableColumns.map(v => {
        return {
          'name': v.action == 'operate' ? 'operate' : v.title,
          'disabled': v.disabled === undefined ? false : v.disabled,
          'checked': v.checked === undefined ? true : v.checked,
          'id': v.id === undefined ? 0 : v.id,
        };
      });

      if (this.checkable) {
        columns.unshift({
          name: 'checkbox',
          disabled: true,
          checked: true,
          id: 1,
        });
      }

      if (this.operable) {
        columns.pop();
        columns.push({
          name: 'operate',
          disabled: true,
          checked: true,
          id: 1,
        });
      }
      // console.log(columns);
      return columns;
    },
    pageIndexChange(page) {
      this.params.pageIndex = page;
      this.getTableDatas();
      // console.log(page);
      // console.log(this.params);
    },
    pageSizeChange(size) {
      this.params.pageSize = size;
      this.getTableDatas();
      // console.log(size);
      // console.log(this.params);
    },
    cancelDelete() {
      this.modal.del = false;
    },
    confirmDelete() {
      let params = this.table.selectedArr.length > 0 ? this.table.selectedArr : this.table.curRow;
      this.modal.del = false;
      this.$emit('on-delete-click', params);
      this.filterIconClose();
      this.getTableDatas();
    },
    filterIconClose() {
      this.operateItems.show = false;
      this.$refs.table.selectAll(false);
      this.$emit('handleClose');
    },
    tableSelectChange(arr) {
      this.operateItems.show = (arr.length > 0) ? true : false;
      this.operateItems.number = arr.length;
      this.table.selectedArr = arr;
    },
    getTableDatas() {
      // filter下拉框添加入params
      if (this.filterType.length > 0) {
        let iterable = ['status', 'name'];
        for (let value of iterable) {
          if (this.filterType.includes(value)) {
            this.params[value] = this[value];
          }
        }
      }

      // filter搜索框添加入params
      if (this.searchText && this.searchText.trim()) {
        this.params.searchText = this.searchText;
      }

      // table-api解析
      if (this.tableApi) {
        let type = this.tableApi.split(':').length > 1 ? this.tableApi.split(':')[0] : 'post',
          url = this.tableApi.split(':').length > 1 ? this.tableApi.split(':')[1] : this.tableApi.split(':')[0],
          [api, params] = url.split('?');

        if (params) {
          params.split('&').forEach((v, i) => {
            this.params[v.split('=')[0]] = v.split('=')[1];
          });
        }


        Rest[type](api, this.params).done(res => {
          if (helper.isSuccess(res)) {
            this.table.data = res.rows;
            this.page.total = res.total;
            this.table.loading = false;
          } else {
            this.$Message.error(res.status.msg);
          }
        });

      }

      // console.log(this.params);

      // 数据请求
      // Rest.get(api.system.module.list).done(res => {
      //   if (helper.isSuccess(res)) {
      //     this.table.data = res.rows;
      //     this.page.total = res.total;
      //     this.table.loading = false;
      //   } else {
      //     this.$Message.error(res.status.msg);
      //   }
      // });
    },
  },
  mounted() {
    this.getTheadColumns();
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>