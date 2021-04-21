<template>
  <base-dialog
    :show="showDialog"
    :position="scrollY + 30"
    @close="hideUserDialog"
    title="winQuest"
  >
    <base-card>
      <h1>Username {{ userData.id }}</h1>
    </base-card>
    <base-card class="light">
      name
      <h1>{{ selectedUserData.username }}</h1>
    </base-card>
    <base-card class="light">
      address
      <ul>
        <li>{{ selectedUserData.address.street }}</li>
        <li>{{ selectedUserData.address.suite }}</li>
        <li>{{ selectedUserData.address.city }}</li>
        <li>{{ selectedUserData.address.zipcode }}</li>
      </ul>
    </base-card>
    <base-card class="light">
      company
      {{ selectedUserData.company.name }}
    </base-card>
  </base-dialog>
</template>

<script>
export default {
  props: ['userData', 'showDialog', 'scrollY']
};
</script>

<style></style>
