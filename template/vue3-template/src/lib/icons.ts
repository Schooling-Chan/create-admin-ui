import {
  UserOutlined,
  HomeFilled,
  SettingFilled
} from '@ant-design/icons-vue';

const Icons = {
  install (Vue: any) {
    Vue.component(UserOutlined.name, UserOutlined);
    Vue.component(HomeFilled.name, HomeFilled);
    Vue.component(SettingFilled.name, SettingFilled);
  }
};
export default Icons;