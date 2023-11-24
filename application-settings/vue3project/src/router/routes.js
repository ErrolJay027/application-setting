import store from "@/state/store";

export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/pages/account/login"),
    meta: {
      title: "Log in",
        beforeResolve(routeTo, routeFrom, next) {
        //   // If the user is already logged in
          console.log(store.getters["auth/loggedIn"])
          console.log(next())
          if (store.getters["auth/loggedIn"]) {
          //   // Redirect to the home page instead
            next();
          } 
        else {
            // Continue to the login page
            next();
          }
          // next()
        }  
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/pages/account/register"),
    meta: {
      title: "Register",
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({
            name: "main"
          });
        } else {
          // Continue to the login page
          next();
        }
      }
    }
  },
  {
    path: "/forgot-password",
    name: "Forgot-password",
    component: () => import("../views/pages/account/forgot-password"),
    meta: {
      title: "Forgot password",
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({
            name: "main"
          });
        } else {
          // Continue to the login page
          next();
        }
      }
    }
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        // if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
        //   store.dispatch("auth/logOut");
        // } else if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
        //   store.dispatch("authfack/logout");
        // }
           store.dispatch("auth/logOut");
        const authRequiredOnPreviousRoute = routeFrom.matched.some((route) =>
          route.push("/login")
        );
        // Navigate back to previous page, or home as a fallback
        next(
          authRequiredOnPreviousRoute
            ? {
                name: "home"
              }
            : {
                ...routeFrom
              }
        );
      }
    }
  },

  // {
  //   path: "/cs",
  //   name: "main",
  //   meta: { title: "Dashboard" },
  //   redirect: "/",
  //   // component: () => import("../views/pages/dashboard/index")
  //   children: [
      {
        path: "/",
        name: "home",
        meta: { title: "Dashboard", authRequired: true },
        component: () => import("../views/pages/dashboard/index")
      },
      {
        path: "/cs",
        name: "home1",
        meta: { title: "Dashboard", authRequired: true },
        component: () => import("../views/pages/dashboard/index")
      },
      {
        path: "/utility/starter",
        name: "Starter-page",
        meta: { title: "Starter page", authRequired: true },
        component: () => import("../views/pages/utility/starter")
      },
      {
        path: "/utility/maintenance",
        name: "maintenance",
        meta: { title: "Maintenance", authRequired: true },
        component: () => import("../views/pages/utility/maintenance")
      },
      {
        path: "/utility/comingsoon",
        name: "comingsoon",
        meta: { title: "Comingsoon", authRequired: true },
        component: () => import("../views/pages/utility/comingsoon")
      },
      {
        path: "/auth/login-1",
        name: "login-1",
        meta: { title: "Login", authRequired: true },
        component: () => import("../views/pages/auth/login-1")
      },
      {
        path: "/auth/register-1",
        name: "register-1",
        meta: { title: "Register", authRequired: true },
        component: () => import("../views/pages/auth/register-1")
      },
      {
        path: "/auth/lock-screen",
        name: "lock-screen",
        meta: { title: "Lock Screen", authRequired: true },
        component: () => import("../views/pages/auth/lock-screen")
      },
      {
        path: "/auth/recoverpwd",
        name: "recoverpwd",
        meta: { title: "Recover Password", authRequired: true },
        component: () => import("../views/pages/auth/recoverpwd")
      },

      {
        path: "/tables/basic",
        name: "tables.basic",
        meta: { title: "Recover Password", authRequired: true },
        component: () => import("../views/pages/tables/basic")
      },

      {
        path: "/application",
        name: "table.application",
        meta: { title: "Recover Password", authRequired: true },
        component: () => import("../views/pages/tables/application")
      },
       {
        path: "/setting",
        name: "table.setting",
        meta: { title: "Recover Password", authRequired: true },
        component: () => import("../views/pages/tables/setting")
      }
  //   ]
  // },
  
];
