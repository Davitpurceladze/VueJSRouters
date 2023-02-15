<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">Go to Team 2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['users', 'teams'],
  props: ['teamID'], // geting the props from main.js :teamID
  components: {
    UserItem,
  },
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  methods: {
    loadTeamMembers(teamID) {
      //we want to select team and team members from app.vue based on url we entered after /team/
      // const teamID = route.params.teamID; //we getting the URL that we entered, teamID has to be matched to registered dynamic router
      const selectedTeam = this.teams.find((team) => team.id === teamID); //team wich id matches entered url
      const members = selectedTeam.members; // selected team has members
      const selectedMembers = [];
      for (const member of members) {
        //loof trough members and if selected teams member matched pushing them to selectedMembers
        const selectedUser = this.users.find((user) => user.id === member);
        selectedMembers.push(selectedUser);
      }
      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    },
  },

  //this is lifecycle hook and that will be called when the component
  //is created before it shown on screen but once all the data is availale

  created() {
    this.loadTeamMembers(this.teamID);
    // console.log(this.$route.query);
  },
  //watching teamID - so the latest url and when it changes
  //call this function to render equal UI
  watch: {
    teamID(newID) {
      this.loadTeamMembers(newID);
    },
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
