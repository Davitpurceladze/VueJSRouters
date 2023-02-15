import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams', //we can navigate simply with name: 'teams'
      path: '/teams',
      components: { default: TeamsList, footer: TeamsFooter }, //we can register more than one router views inside of component,
      children: [
        {
          name: 'team-members',
          path: ':teamID',
          component: TeamMembers,
          props: true,
        },
      ], //so teammembers component is child of teamlist component and we have to register it inside teamlis (parent component), also we can to register children routes inside of children routes
    },
    {
      path: '/users',
      components: { default: UsersList, footer: UsersFooter },
      // we can run any functions we want before enter users component
      beforeEnter(to, from, next) {
        next();
      },
    },
    // { path: '/teams/:teamID', component: TeamMembers, props: true }, // :anyName - it matches everything that starts with /teams, also order matters as if we write /teams/new after this dynamic path it wont be renderd, adding props:true parameter means that "teamID" goes as props to the TeamMembers component to make it more reuseble
    { path: '/:notFound(.*)', component: NotFound }, //'/:notFound(.*)' means that any possible character combination will direct to component we chose or we can redirect too, and this must be last in routes list
  ],
  linkActiveClass: 'active', // we change link-active-class with active, that means that when link is activated with active class we can add some custom style
  scrollBehavior(to, from, savedPosition) {
    // describes scroll bar and have 3 arguments it has to return left: and top: parameters
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

//with navigation guards we can chek if user is autenticated and
//give it acces to pages with next()
//or not next(false)
//beforeEachh function runs on every navigation
router.beforeEach(function (to, from, next) {
  next();
});

//it will run after navigation is confirmd
router.afterEach(function (to, from) {
  console.log(to, from);
});

//importing whole file as we need it in main.js
export default router;
