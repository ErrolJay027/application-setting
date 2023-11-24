export const menuItems = [
  {
    id: 1,
    label: "menuitems.dashboard.text",
    icon: "uil-home-alt",
    link: "/"
  },
  {
    id: 71,
    label: "menuitems.pages.text",
    icon: "uil-copy",
    subItems: [
      {
        id: 72,
        label: "menuitems.authentication.text",
        subItems: [
          {
            id: 73,
            label: "menuitems.authentication.list.login",
            link: "/auth/login-1"
          },
          {
            id: 74,
            label: "menuitems.authentication.list.register",
            link: "/auth/register-1"
          },
          {
            id: 75,
            label: "menuitems.authentication.list.recoverpwd",
            link: "/auth/recoverpwd"
          },
          {
            id: 76,
            label: "menuitems.authentication.list.lockscreen",
            link: "/auth/lock-screen"
          }
        ]
      },
      {
        id: 77,
        label: "menuitems.utility.text",
        subItems: [
          {
            id: 78,
            label: "menuitems.utility.list.starter",
            link: "/utility/starter"
          },
          {
            id: 79,
            label: "menuitems.utility.list.maintenance",
            link: "/utility/maintenance"
          },
          {
            id: 80,
            label: "menuitems.utility.list.comingsoon",
            link: "/utility/comingsoon"
          }
        ]
      }
    ]
  }
];
