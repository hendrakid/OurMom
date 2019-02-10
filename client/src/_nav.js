export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Master',
      url: '/mom',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Master Login',
          url: '/mom/user-login',
          icon: 'icon-puzzle'
        },
        {
          name: 'Master Project',
          url: '/mom/master-project',
          icon: 'icon-puzzle'
        },
        {
          name: 'Master Customer',
          url: '/mom/master-customer',
          icon: 'icon-puzzle'
        },
        {
          name: 'Master Location',
          url: '/mom/master-location',
          icon: 'icon-puzzle'
        },
        {
          name: 'Master Mom',
          url: '/mom/master-mom',
          icon: 'icon-puzzle'
        },
        {
          name: 'Master Menu',
          url: '/mom/master-menu',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Maintain',
      url: '/momsv',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'User   Login',
          url: '/mom/maintain-user-login',
          icon: 'icon-puzzle'
        }
      ]
    }
  ]
}
