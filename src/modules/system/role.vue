<template>
  <div class="view-system-role">
    <crumb :list="crumbList"></crumb>
    <div class="content content-scroll">
      <Row>
        <Col span="6" style="padding-right:10px">
        <Select :label-in-value="true" @on-change="changeRole" v-model="role" filterable>
          <Option v-for="item in roleList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
          <Option class="ivu-select-item-selected ivu-select-item-focus" value="0" @click.prevent.native="editRole(false)">
            <Icon type="ios-add" size="22" />添加角色</Option>
        </Select>
        </Col>
        <Col span="4">
        <!--  <Dropdown>
        <a href="javascript:void(0)">
            <span @click="editRole(true)"><Icon type="ios-create-outline" size="24" />修改角色名称</span>
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
            <DropdownItem @click="editRole(false)"><Icon type="ios-add" size="22" />添加角色</DropdownItem>
        </DropdownMenu>
    </Dropdown> -->
        <span class="cp-color-hover" @click="editRole(true)"><Icon type="ios-create-outline" size="24" />修改角色名称</span>
        <!-- <span @click="editRole(false)"><Icon type="ios-add" size="22" />添加角色</span> -->
        </Col>
      </Row>
      <p class="c-color-gray c-mt-15">说明： 修改角色权限后，所有赋予此角色的员工账号对应权限均将修改；</p>
      <div class="ivu-table">
        <table class="table">
          <tbody class="ivu-table-tbody">
            <tr class="ivu-table-row">
              <td rowspan="8">主数据</td>
              <td rowspan="4">组织架构</td>
              <td>行政区域</td>
              <td>
                <Checkbox v-model="single">查看</Checkbox>
              </td>
            </tr>
            <tr class="ivu-table-row">
              <td>地区管理</td>
              <td>
                <Checkbox v-model="single">查看</Checkbox>
              </td>
            </tr>
            <tr class="ivu-table-row">
              <td>组织机构管理</td>
              <td>
                <Checkbox v-model="single">查看</Checkbox>
              </td>
            </tr>
            <tr class="ivu-table-row">
              <td>片区管理</td>
              <td>
                <Checkbox v-model="single">查看</Checkbox>
                <Checkbox v-model="single">新增</Checkbox>
                <Checkbox v-model="single">编辑</Checkbox>
                <Checkbox v-model="single">删除</Checkbox>
                <Checkbox v-model="single">导出</Checkbox>
              </td>
            </tr>
            <tr class="ivu-table-row">
              <td rowspan="4">组织架构</td>
              <td>行政区域</td>
            </tr>
            <tr class="ivu-table-row">
              <td>地区管理</td>
            </tr>
            <tr class="ivu-table-row">
              <td>组织机构管理</td>
            </tr>
            <tr class="ivu-table-row">
              <td>片区管理</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 添加、修改角色弹窗 -->
    <Modal v-model="modal.show" :title="modal.title" @on-ok="saveRoleName">
      <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
        <FormItem label="角色名称" prop="name">
          <Input v-model="form.name" placeholder="请输入角色名称"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- /添加、修改角色弹窗 -->
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
        name: '角色权限'
      }],
      roleList: [{
        name: '资讯',
        Id: 1
      }, {
        name: '客服',
        Id: 2
      }, {
        name: '收银员',
        Id: 3
      }, {
        name: '店长',
        Id: 4
      }],
      role: 1,
      modal: {
        show: false,
        title: '修改角色名称',
      },
      form: {
        name: '',
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
      },
      single: false
    }
  },
  created() {

  },
  methods: {
    saveRoleName() {

    },
    changeRole(item) {
      this.form.name = (item.value == 0) ? '' : item.label;
      this.role = (item.value == 0) ? this.role : item.value;
    },
    editRole(flag) {
      this.modal.title = flag ? '修改角色名称' : '添加角色';
      this.modal.show = true;
      this.saveRoleName();
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>