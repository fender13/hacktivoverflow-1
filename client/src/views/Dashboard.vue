<template>
  <div class="main-dashboard">
    <div class="d-flex">
      <div class="col-2 sidebar-menu">
        <DashboardSidebar></DashboardSidebar>
      </div>
      <div class="col-10">
        <div class="row topbar-menu-dashboard">
          <div class="dropdown dropdown-topbar">
            <a class="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ isUsername }}
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item" type="button">Home</a>
              <a class="dropdown-item" type="button">Another action</a>
              <a class="dropdown-item" type="button">Something else here</a>
            </div>
          </div>
        </div>
        <div class="row dashboard-content">
          <transition
            name="fade"
            mode="out-in"
          >
            <router-view/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardSidebar from '@/components/SideBar.vue'

export default {
  name: 'Dashboard',
  components: {
    DashboardSidebar
  },
  computed: {
    isUsername(state) {
      return this.$store.getters.isUsername
    }
  },
}
</script>

<style scoped>
.main-dashboard {
  margin: 0;
  padding: 0;
  max-width: 100%;
  min-height: 100vh;
}

.sidebar-menu {
  min-height: 100vh;
  background-color: #fc7753;
  width: 100%;
}

.topbar-menu-dashboard {
  height: 60px;
  border-bottom: 1px solid #fc7753;
  display: flex;
  justify-content: flex-end;
}

.dropdown-topbar{
  display: flex;
  width: 200px;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #fc7753;
}

.dashboard-content {
  min-height: 100vh;
}

.dashboard-title {
  height: 160px;
}

#dropdown-right {
  background-color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>

