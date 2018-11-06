window.iview = require('iview');

import Home from './home.js';
import Crumb from './crumb.js';
import DropSelect from './drop_select.js';
import GridTable from './grid_table.js';
import HeadNav from './head_nav.js';
import ChildrenNav from './child_nav.js';
import { helper } from '@/helper.js';
import Rest from '@/rest.js';
import consts from '@/utils/consts.js';
import api from '@/api.js';


window.GLOBAL = {
  'Home': Home,
  'DropSelect': DropSelect,
  'Crumb': Crumb,
  'GridTable': GridTable,
  'HeadNav': HeadNav,
  'ChildrenNav': ChildrenNav,
  'helper': helper,
  'Rest': Rest,
  'consts': consts,
  'api': api,
};