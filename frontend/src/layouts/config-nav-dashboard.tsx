import { Label } from '@/components/label';
import { SvgColor } from '@/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Grant request',
    path: '/grant-request',
    icon: icon('ic-user'),
  },
  {
    title: 'User list',
    path: '/users',
    guard: ['user', 'reviewer', "grant_dep", "grant_dir"],
    icon: icon('ic-cart'),
    // info: (
    //   <Label color="error" variant="inverted">
    //     +3
    //   </Label>
    // ),
  },
  {
    title: 'Apply',
    path: '/apply',
    icon: icon('ic-blog'),
  },
  {
    title: 'Announcement Portal',
    path: '/announcement-portal',
    guard: ["grant_dep", "grant_dir",'user', 'reviewer',"col_dean"],
    icon: icon('ic-lock'),
  }
];
