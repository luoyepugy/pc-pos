export default {
    template: `<Dropdown trigger="click" @on-visible-change="changeVisible" :class="{'ivu-dropdown-visible': visible}" @on-click="changeItem" placement="bottom-start">
    <a href="javascript:void(0)">{{text}}<Icon type="ios-arrow-down"></Icon></a>
    <DropdownMenu slot="list">
      <DropdownItem :selected="item.Id==selectedId" :name="item.Id" v-for="item in list" :key="item.Id">{{ item.name }}</DropdownItem>
    </DropdownMenu>
  </Dropdown>`,
    data() {
      return {
        visible: false,
        text: this.list[0].name,
        selectedId: this.list[0].Id,
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
  };
