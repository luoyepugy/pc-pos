<template>
  <Dropdown trigger="click" @on-visible-change="changeVisible" :class="{'ivu-dropdown-visible': visible}" @on-click="changeItem" placement="bottom-start">
    <a href="javascript:void(0)">{{text}}<Icon type="ios-arrow-down"></Icon></a>
    <DropdownMenu slot="list">
      <DropdownItem :selected="item.Id==selectedId" :name="item.Id" v-for="item in list" :key="item.Id">{{ item.name }}</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      visible: false,
      text: this.list[0].name,
      selectedId: this.list[0].id,
    }
  },
  props: {
    list: Array,
  },
  methods: {
    changeVisible(visible) {
      this.visible = visible;
    },
    changeItem(id) {
      this.selectedId = id;
      this.text = this.list.filter(v => v.Id == id)[0].name;
      this.$emit('on-change', id);
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.ivu-dropdown-item {
  &:hover {
    color: $primary;
  }
}

.ivu-dropdown .ivu-icon-ios-arrow-down {
  transition: all .2s ease-in-out;
  margin: 0 5px;
}

.ivu-dropdown-visible .ivu-icon-ios-arrow-down {
  transform: rotate(180deg);
}
</style>