import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: '2',
    title: 'Xem bảng xếp hạng đội đua',
    type: 'item',
    icon: 'file',
    url: 'apps/ranking'
  },
  {
    id: '3',
    title: 'Cập nhật kết quả',
    type: 'item',
    icon: 'file',
    url: 'apps/update'
  },
  {
    id: '4',
    title: 'Quản lý chặng đua',
    type: 'item',
    icon: 'file',
    url: 'apps/race'
  }
]
