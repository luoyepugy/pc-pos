<template>
  <div>
    <Crumb :list="crumbList"></Crumb>
    <GridTable filter-ph="请输入模块编号/名称" :filter-type="filter.type" table-api="get:module?a=b" :table-columns="table.columns" @on-detail-click="moduleDetail" operable checkable @on-edit-click="moduleEdit" @on-delete-click="moduleDelete">
      <div class="icons" slot="grid-icon-button">
        <span class="button"><Icon type="ios-trash-outline" size="22" />删除2</span>
      </div>
      <div slot="grid-right-button">
        <Button class="c-button" @click="">导出</Button>
        <Button type="primary" class="c-button" @click="addModal">新增</Button>
      </div>
    </GridTable>
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
  </div>
</template>
<script type="text/ecmascript-6">
import consts from '@/utils/consts';
import Rest from '@/rest';
import Helper from '@/helper';

export default {
  data() {
    return {
      crumbList: [{
        name: '系统设置',
      }, {
        name: '模块列表2'
      }],
      systemList: consts.SYSTEM_NAME,
      form_statusList: consts.SYSTEM_STATUS,
      operationList: consts.MENU_PERMISSION,
      filter: {
        type: ['status'],
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
      table: {
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
            title: '名称',
            key: 'name',
            width: 200,
          },
          {
            title: '编码',
            key: 'code',
            width: 420,
          },
          {
            title: '地址',
            key: 'url',
            width: 250,
          },
          {
            title: '菜单类型',
            key: 'type',
            width: 100,
            fieldMapping: 'menu_type',
          },
          {
            title: '操作权限',
            key: 'operations',
            width: 250,
            fieldMapping: 'menu_permission',
          },
          {
            title: '状态',
            key: 'status',
            width: 100,
            fieldMapping: 'system_status',
          },
          {
            title: '创建时间',
            key: 'createTime',
            width: 200,
          },
          {
            title: '创建人',
            key: 'createUser',
            width: 150,
          },
          {
            title: '更新时间',
            key: 'updateTime',
            width: 200,
          },
          {
            title: '更新人',
            key: 'updateUser',
            width: 100,
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
            }]
          }
        ],
      }
    }
  },
  created() {

  },
  methods: {
    moduleDelete(data) {
      console.log(data);
    },
    handleExport() {
      console.log('111');
    },
    moduleDetail(row) {
      this.$root.go({ name: 'system-module-detail', params: { id: row.moduleNo } });
    },
    addModal() {
      this.modal.add = true;
      this.modal.addTitle = '新增模块';
      this.modal.isEdit = false;
      this.$refs['form'].resetFields();
    },
    moduleEdit(row) {
      this.modal.add = true;
      this.$refs['form'].resetFields();
      this.modal.addTitle = '编辑模块';
      this.modal.isEdit = true;
      Object.assign(this.form, row);
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
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>