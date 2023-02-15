<template>
  <button @click="confirmInput">confirm</button>
  <button @click="saveChanges">save changes</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return {
      changesSaved: false,
    };
  },
  methods: {
    confirmInput() {
      this.$router.push('/teams'); // if we want to go on different page after doing some logic after click on button
    },
    saveChanges() {
      this.changesSaved = true;
    },
  },
  //we can use navigation guard inside of the component also
  beforeRouteEnter(to, from, next) {
    next();
  },

  //with beforeRouteLeave we can make some actions before user
  //leaves page
  beforeRouteLeave(to, from, next) {
    if (this.changesSaved) {
      next();
    } else {
      const userWantsToLeave = confirm('Are you sure? You got unsaved changes');
      next(userWantsToLeave);
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
