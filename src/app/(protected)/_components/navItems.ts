export const mainNavItems = [
  {
    label: 'Projects',
    icon: 'folder_open',
    collapsedIcon: 'grid_view',
    href: '/project',
    mobileIcon: 'grid_view',
    mobileLabel: 'Projects',
    mobileIconFilled: true,
  },
];

export const projectNavItems = (projectId: string) => [
  {
    label: 'Projects',
    icon: 'folder_open',
    collapsedIcon: 'grid_view',
    href: '/project',
    mobileIcon: 'grid_view',
    mobileLabel: 'Projects',
    mobileIconFilled: true,
  },
  {
    label: 'Project Epics',
    icon: 'account_tree',
    collapsedIcon: 'account_tree',
    href: `/project/${projectId}/epics`,
    mobileIcon: 'account_tree',
    mobileLabel: 'Epics',
    mobileIconFilled: false,
  },
  {
    label: 'Project Tasks',
    icon: 'checklist',
    collapsedIcon: 'checklist',
    href: `/project/${projectId}/tasks`,
    mobileIcon: 'checklist',
    mobileLabel: 'Tasks',
    mobileIconFilled: false,
  },
  {
    label: 'Project Members',
    icon: 'group',
    collapsedIcon: 'group',
    href: `/project/${projectId}/members`,
    mobileIcon: 'group',
    mobileLabel: 'Members',
    mobileIconFilled: false,
  },
  {
    label: 'Project Details',
    icon: 'info',
    collapsedIcon: 'info',
    href: `/project/${projectId}/edit`,
    mobileIcon: 'info',
    mobileLabel: 'Details',
    mobileIconFilled: false,
  },
];
