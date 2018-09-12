<template>
  <Drawer class="cp-table-filtermodal" title="选择显示字段" :closable="false" v-model="fields.isShow">
    <Checkbox-group v-model="fields.checked">
      <Checkbox v-for="(item,index) in fields.default" :key="index" :label="item.name" :disabled="item.disabled">
        <span>{{item.name}}</span>
        <span class="arrow" v-if="!item.disabled">
          <Icon @click.prevent.native="sortUp(index)" v-show="index!=minIndex" type="md-arrow-up" size="20" />
          <Icon @click.prevent.native="sortDown(index)" v-show="index!=maxIndex" type="md-arrow-down" size="20" />
        </span>
      </Checkbox>
    </Checkbox-group>
    <div class="footer">
      <Button type="primary" @click="confirm">确定</Button>
      <Button @click="cancel">取消</Button>
    </div>
  </Drawer>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    fields: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    minIndex() {
      let visibleList = this.fields.default.filter((v, i) => !v.disabled);
      return this.fields.default.indexOf(visibleList[0]);
    },
    maxIndex() {
      let visibleList = this.fields.default.filter((v, i) => !v.disabled);
      return this.fields.default.lastIndexOf(visibleList[visibleList.length - 1]);
    }
  },
  created() {

  },
  methods: {
    sortUp(index) {
      this.fields.default[index] = this.fields.default.splice(index - 1, 1, this.fields.default[index])[0];
      this.getChecked();
    },
    sortDown(index) {
      this.fields.default[index] = this.fields.default.splice(index + 1, 1, this.fields.default[index])[0];
      this.getChecked();
    },
    getChecked() {
      let checkeds = this.fields.default.filter(v => v.checked);
      this.fields.checked = checkeds.map(v => v.name);
    },
    confirm() {
      let data = [];
      this.getChecked();
      this.fields.checked.forEach(col => data.push(this.fields.columns[col]));
      this.fields.isShow = false;
      this.$emit('change', data);
    },
    cancel() {
      this.fields.isShow = false;
    },
  },
  mounted() {
    this.confirm();
  }
}

</script>
