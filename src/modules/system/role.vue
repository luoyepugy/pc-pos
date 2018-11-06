<template>
  <div class="view-system-role">
    <crumb :list="crumbList"></crumb>
    <div class="content content-scroll">
      <Row>
        <Col span="6" style="padding-right:10px">
        <Select @on-change="changeRole" :label-in-value="true" v-model="role" filterable>
          <Option v-for="item in roleList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
          <Option class="ivu-select-item-selected ivu-select-item-focus" :value="0" @click.prevent.native="editRole(false)">
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
      <!-- <div class="ivu-table">
  <table class="table">
    <tbody class="ivu-table-tbody">
      <tr v-for="item in roleDatas" class="ivu-table-row">
        <td v-for="child in item" :rowspan="child.row || 1" :colspan="child.col || 1">
          <span v-if="!child.list">{{child.name}}</span>
          <Checkbox v-for="ck in child.list" v-model="checkedList[ck.id]">{{ck.name}}</Checkbox>
        </td>
      </tr>
    </tbody>
  </table>
</div> -->
    </div>
    <div class="content-footer">
      <Button type="primary" class="c-button" @click="save">保存</Button>
    </div>
    <!-- 添加、修改角色弹窗 -->
    <Modal :mask-closable="false" v-model="modal.show" :title="modal.title" @on-ok="saveRoleName">
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
import api from '@/api';
import { helper } from '@/helper';

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
      roleDatas: [],
      checkedList: {},
      curRole: {},
      isEdit: true,
    }
  },
  created() {
    this.getRoleDatas();
  },
  methods: {
    getRoleDatas() {
      var that = this;
      Rest.get(api.system.role.list).done(res => {
        if (helper.isSuccess(res)) {
          this.roleDatas = res.rows;
          res.rows.forEach(v => {
            v.forEach(i => {
              if (i.list && i.list.length > 0) {
                i.list.forEach(j => {
                  this.checkedList[j.id] = j.checked;
                });
              }
            });
          });
        } else {
          this.$Message.error(res.status.msg);
        }
      });
    },
    save() {
      console.log(this.checkedList);
    },
    saveRoleName() {
      if (this.isEdit) {
        this.roleList.filter(v => this.curRole.value == v.Id)[0].name = this.form.name;
      } else {
        this.roleList.push({
          name: this.form.name
        });
      }
    },
    changeRole(item) {
      this.form.name = (item.value == 0) ? '' : item.label;
      console.log(item.value);
      this.role = (item.value == 0) ? 1 : item.value;
      this.curRole = item;
    },
    editRole(flag) {
      this.modal.title = flag ? '修改角色名称' : '添加角色';
      this.modal.show = true;
      this.isEdit = flag;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>