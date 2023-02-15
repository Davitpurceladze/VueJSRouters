import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

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
    { path: '/users', components: { default: UsersList, footer: UsersFooter } },
    // { path: '/teams/:teamID', component: TeamMembers, props: true }, // :anyName - it matches everything that starts with /teams, also order matters as if we write /teams/new after this dynamic path it wont be renderd, adding props:true parameter means that "teamID" goes as props to the TeamMembers component to make it more reuseble
    { path: '/:notFound(.*)', component: NotFound }, //'/:notFound(.*)' means that any possible character combination will direct to component we chose or we can redirect too, and this must be last in routes list
  ],
  linkActiveClass: 'active', // we change link-active-class with active, that means that when link is activated with active class we can add some custom style
});

const app = createApp(App);

app.use(router);
app.mount('#app');
