<template>
  <div class="position-fixed nav-side-menu">
    <ul>
      <!-- Sidebar - Brand -->
      <router-link to="/">
        <a class="dashboard-title d-flex align-items-center justify-content-center">
          <div class="sidebar-brand-text mx-3">HacktivOverflow</div>
        </a>
      </router-link>
      
      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <a class="nav-link">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <router-link to="/dashboard/all-questions">
          <a class="nav-link" href="#">
            <i class="far fa-question-circle"></i>
            <span>All Questions</span></a>
        </router-link>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <router-link to="/dashboard/add-new-questions">
          <a class="nav-link" href="#">
            <i class="far fa-plus-square"></i>
            <span>New Questions</span></a>
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'DashboardSidebar',
  data() {
    return {

    }
  },
  methods: {
  
  }
}
</script>

<style scoped>
.nav-side-menu ul {
  list-style: none;
  padding: 0;
}

.nav-side-menu a {
  color: white;
  font-weight: 300;
  text-decoration: none;
}

.nav-item a {
  color: white;
  font-weight: 300;
  font-size: 15px;
}

.dashboard-title {
  height: 160px;
}

.nav-link i {
  margin-right: 5%;
}

.nav-link {
  margin: 0;
  padding: 0;
  width: 150px;
  text-align: left;
  margin-left: 10%;
}

.sidebar-divider {
  margin-bottom: 15%;
  margin-top: 15%;
}

</style>
