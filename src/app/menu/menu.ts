import { CoreMenu } from '@core/types';
import { Role } from 'app/auth/models';
const superadmin = JSON.parse(localStorage.getItem('currentUser'))?.role.includes(Role.SuperAdmin);
const admin = JSON.parse(localStorage.getItem('currentUser'))?.role.includes(Role.Admin);
console.log(superadmin, admin);

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Trang chủ',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: '2',
    title: 'Bảng xếp hạng',
    type: 'item',
    icon: 'activity',
    url: 'apps/ranking'
    
  },
  {
    id: '3',
    title: 'Cập nhật kết quả',
    type: 'item',
    icon: 'save',
    url: 'apps/update',
    hidden: !admin,
  },
  {
    id: '4',
    title: 'Quản lý chặng đua',
    type: 'item',
    icon: 'target',
    url: 'apps/race',
    hidden: !admin,
  },
  {
    id: '5',
    title: 'Login',
    type: 'item',
    icon: 'log-in',
    url: 'pages/authentication/login',
    hidden: admin,
  },
  // {
  //   id: '6',
  //   title: 'Logout',
  //   type: 'item',
  //   icon: 'log-out',
  //   url: 'pages/authentication/login',
  //   hidden: !admin
  // }
]
