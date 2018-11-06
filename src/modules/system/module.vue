<template>
  <div>
    <Crumb :list="crumbList"></Crumb>
    <div class="content">
      <div class="content-filter" v-show="!tools.show">
        <Select v-model="status" style="width:200px">
          <Option v-for="item in statusList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
        </Select>
        <Select v-model="name" style="width:200px">
          <Option v-for="item in nameList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
        </Select>
        <Input search placeholder="请输入模块编号/名称" />
        <div class="button-group">
          <Button class="c-button">导出</Button>
          <Button type="primary" class="c-button" @click="addModal">新增</Button>
        </div>
      </div>
      <div class="content-tools" v-show="tools.show">
        <span class="button" @click="selectionClose"><Icon type="ios-close" size="30" /></span>
        <span class="label">已选择<b class="number">{{tools.number}}</b>项</span>
        <span class="button" @click="modal.del=true"><Icon type="ios-trash-outline" size="22" />删除</span>
      </div>
      <div class="content-table">
        <span v-if="table.data.length>0" @click="table.fields.isShow=true" class="cp-color-hover icon-filter-column"><Icon type="ios-options-outline" size="24"></Icon></span>
        <Table class="cp-table-full" ref="table" @on-selection-change="selectionChange" :loading="table.loading" :columns="table.columns" :data="table.data"></Table>
        <Page @on-change="pageChange" @on-page-size-change="pageSizeChange" :total="page.total" show-sizer show-total show-elevator />
      </div>
    </div>
    <!-- 新增/编辑模态框 -->
    <Modal :mask-closable="false" :value="modal.add" v-model="modal.add" :title="modal.addTitle">
      <Form ref="form" :model="form" :rules="ruleValidate" :label-width="90">
        <FormItem label="模块编号" prop="moduleNo" v-show="modal.isEdit">
          <Input v-model="form.moduleNo" disabled></Input>
        </FormItem>
        <FormItem label="名称" prop="name">
          <Input v-model="form.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="所属系统" prop="appNo">
          <Select v-model="form.appNo" placeholder="请选择...">
            <Option v-for="item in systemList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="地址" prop="url">
          <Input v-model="form.url" placeholder="请输入地址"></Input>
        </FormItem>
        <FormItem label="状态" prop="status">
          <Select v-model="form.status" placeholder="请选择...">
            <Option v-for="item in form_statusList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="操作权限" prop="operations">
          <Select multiple filterable v-model="form.operations" placeholder="请选择...">
            <Option v-for="item in operationList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="编码" prop="code">
          <Input v-model="form.code" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入编码..."></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelForm">取消</Button>
        <Button type="primary" @click="saveForm">确定</Button>
      </div>
    </Modal>
    <!-- /新增模态框 -->
    <!-- 删除模态框 -->
    <Modal title="提示" v-model="modal.del" @on-ok="saveDelete">
      确定要删除吗？
    </Modal>
    <!-- /删除模态框 -->
    <!-- 选择显示字段 -->
    <TableColumnFilter @change="table.columns=arguments[0]" :fields="table.fields"></TableColumnFilter>
    <!-- /选择显示字段 -->
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
      }],
      statusList: consts.SYSTEM_STATUS_ALL,
      status: 2,
      nameList: consts.SYSTEM_NAME_ALL,
      operationList: consts.MENU_PERMISSION,
      name: 0,
      table: {
        fields: {
          isShow: false,
          columns: this.getTableColumns(),
          default: [
            { name: 'checkbox', disabled: true, checked: true, id: 1 },
            { name: '模块编号', disabled: true, checked: true },
            { name: '系统名称', disabled: false, checked: true },
            { name: '名称', disabled: false, checked: true },
            { name: '编码', disabled: false, checked: true },
            { name: '地址', disabled: false, checked: true },
            { name: '菜单类型', disabled: false, checked: true },
            { name: '操作权限', disabled: false, checked: true },
            { name: '状态', disabled: false, checked: true },
            { name: '创建时间', disabled: false, checked: true },
            { name: '创建人', disabled: false, checked: true },
            { name: '更新时间', disabled: false, checked: true },
            { name: '更新人', disabled: false, checked: true },
            { name: 'operate', disabled: true, checked: true, id: 1 }
          ],
        },
        loading: true,
        columns: [],
        data: [],
      },
      tools: {
        show: false,
        number: 0
      },
      modal: {
        add: false,
        del: false,
        addTitle: '新增模块',
        isEdit: false,
      },
      form: {
        moduleNo: '',
        name: '',
        appNo: '',
        url: '',
        status: '',
        operations: '',
        code: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        appNo: [
          { type: 'number', required: true, message: '请选择系统名称', trigger: 'change' },
        ],
        url: [
          { required: true, message: '请输入地址', trigger: 'blur' },
        ]
      },
      systemList: consts.SYSTEM_NAME,
      form_statusList: consts.SYSTEM_STATUS,
      operationList: consts.MENU_PERMISSION,
      page: {
        total: 0,
        size: 10,
        index: 1,
      },
    }
  },
  created() {
    this.getTableDatas();
  },
  methods: {
    getTableColumns() {
      const columns = {
        'checkbox': {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        '模块编号': {
          title: '模块编号',
          key: 'moduleNo',
          width: 100,
          render: (h, params) => {
            return h('router-link', {
              props: {
                to: '/system/module-detail/' + params.row.moduleNo
              }
            }, params.row.moduleNo)
          }
        },
        '系统名称': {
          title: '系统名称',
          key: 'appNo',
          width: 150,
          render: (h, params) => {
            return h('span', helper.fieldMapping(params.row.appNo, consts.SYSTEM_NAME));
          }
        },
        '名称': {
          title: '名称',
          key: 'name',
          width: 200
        },
        '编码': {
          title: '编码',
          key: 'code',
          width: 420
        },
        '地址': {
          title: '地址',
          key: 'url',
          width: 250
        },
        '菜单类型': {
          title: '菜单类型',
          key: 'type',
          width: 100,
          render: (h, params) => {
            return h('span', helper.fieldMapping(params.row.type, consts.MENU_TYPE));
          }
        },
        '操作权限': {
          title: '操作权限',
          key: 'operations',
          width: 250,
          render: (h, params) => {
            return h('span', helper.fieldMapping(params.row.operations, consts.MENU_PERMISSION));
          }
        },
        '状态': {
          title: '状态',
          key: 'status',
          width: 100,
          render: (h, params) => {
            return h('span', helper.fieldMapping(params.row.status, consts.SYSTEM_STATUS));
          }
        },
        '创建时间': {
          title: '创建时间',
          key: 'createTime',
          width: 200
        },
        '创建人': {
          title: '创建人',
          key: 'createUser',
          width: 150
        },
        '更新时间': {
          title: '更新时间',
          key: 'updateTime',
          width: 200
        },
        '更新人': {
          title: '更新人',
          key: 'updateUser',
          width: 100
        },
        'operate': {
          title: ' ',
          key: 'action',
          width: 50,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Dropdown', {
                props: {
                  transfer: true,
                  placement: 'bottom-end'
                },
                on: {
                  'on-click': (name) => {
                    switch (name) {
                      case 'edit':
                        this.modal.add = true;
                        this.$refs['form'].resetFields();
                        this.modal.addTitle = '编辑模块';
                        this.modal.isEdit = true;
                        Object.assign(this.form, params.row);
                        break;
                      case 'detail':
                        this.$root.go({ name: 'system-module-detail', params: { id: params.row.moduleNo } });
                        break;
                      case 'delete':
                        this.modal.del = true;
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
                }, [
                  h('DropdownItem', {
                    props: {
                      name: 'edit'
                    }
                  }, [h('Icon', {
                      props: {
                        type: 'ios-create-outline',
                        size: '20'
                      }
                    }),
                    '编辑'
                  ]),
                  h('DropdownItem', {
                    props: {
                      name: 'detail'
                    }
                  }, [h('Icon', {
                      props: {
                        type: 'ios-document-outline',
                        size: '20'
                      }
                    }),
                    '详情'
                  ]),
                  h('DropdownItem', {
                    props: {
                      name: 'delete'
                    }
                  }, [h('Icon', {
                      props: {
                        type: 'ios-trash-outline',
                        size: '20'
                      }
                    }),
                    '删除'
                  ]),
                ])
              ])
            ])
          }
        }
      };
      return columns;
    },
    pageChange(page) {
      this.page.index = page;
      console.log(page);
    },
    pageSizeChange(size) {
      this.page.size = size;
      console.log(size);
    },
    addModal() {
      this.modal.add = true;
      this.modal.addTitle = '新增模块';
      this.modal.isEdit = false;
      this.$refs['form'].resetFields();
    },
    saveForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$Message.success(this.modal.isEdit ? '修改成功' : '新增成功');
        }
        this.modal.add = valid ? false : true;
      });
    },
    cancelForm() {
      this.modal.add = false;
      this.$refs['form'].resetFields();
    },
    saveDelete() {
      this.selectionClose();
    },
    selectionClose() {
      this.tools.show = false;
      this.$refs.table.selectAll(false);
    },
    selectionChange(arr) {
      this.tools.show = (arr.length > 0) ? true : false;
      this.tools.number = arr.length;
    },
    getTableDatas() {
      Rest.get(api.system.module.list).done(res => {
        if (helper.isSuccess(res)) {
          this.table.data = res.rows;
          this.page.total = res.total;
          this.table.loading = false;
        } else {
          this.$Message.error(res.status.msg);
        }
      });
    },
  },
  mounted() {
    this.getTableColumns();
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>