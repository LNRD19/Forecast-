<template>
  <div :class="['sidebar', { 'collapsed': isCollapsed }]">
    <h2 v-if="!isCollapsed" class="sidebar-title">
      <img src="@/assets/Cafe-Logo-Transparent-Background.png" class="sidebar-logo" />
      <span class="sidebar-title-text">Café Beata</span>
    </h2>

    <ul v-if="!isCollapsed" class="sidebar-list">
      <li v-for="(link, index) in links" :key="index">
        <router-link
          :to="link.path"
          class="sidebar-link"
          active-class="active-link"
        >
          <i :class="link.icon"></i> {{ link.name }}
        </router-link>
      </li>
    </ul>

    <ul v-else class="sidebar-list">
      <li v-for="(link, index) in links" :key="index">
        <router-link :to="link.path" class="sidebar-link" active-class="active-link">
          <i :class="link.icon"></i>
        </router-link>
      </li>
    </ul>

    <div class="sidebar-footer">
      <router-link to="/" class="sidebar-link" @click="logout">
        <i class="fas fa-sign-out-alt"></i> Logout
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      links: [
        { name: 'Dashboard', path: '/homesms', icon: 'fas fa-tachometer-alt' },
        { name: 'Orders', path: '/order', icon: 'fas fa-shopping-cart' },
        { name: 'Create Orders', path: '/createorder', icon: 'fas fa-plus-circle' },
        { name: 'Sales', path: '/sales', icon: 'fas fa-cash-register' },
        { name: 'Inventory', path: '/inventorysms', icon: 'fas fa-box' },
        { name: 'Orders History', path: '/ordershistory', icon: 'fas fa-clock' },
        { name: 'Reports', path: '/reportssms', icon: 'fas fa-file-alt' },
        { name: 'Forecast', path: '/forecast', icon: 'fas fa-file-alt' } // Updated path here
      ],
    };
  },
  methods: {
    logout() {
      console.log("Logging out...");
    }
  }
};
</script>




<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  padding: 20px;
  background-color: #FF32BA;
  height: 100vh;
  position: fixed;
  top: 0;
  transition: width 0.3s ease;
  box-shadow: 2px 0 10px #FF00A9;
}

.sidebar-logo {
  width: 42%;
  height: auto;
  margin: 0 auto;
  display: block;
}

.sidebar-title {
  text-align: center;
  margin-top: 5px;
  margin-bottom: 30px;
}

.collapsed {
  width: 50px;
}

.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #fff;
}

.sidebar-title-text {
  color: #fff;
  font-size: 25px;
  font-family: 'Verdana', sans-serif;
  margin-top: 10px;
  display: block;
}

.sidebar-list {
  list-style-type: none;
  padding: 0;
  margin-bottom: auto;
}

.sidebar-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 0;
  font-size: 17px;
  font-family: 'Arial', sans-serif;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  margin: 15px 0;
  transition: color 0.3s, border-color 0.3s;
}

.sidebar-link i {
  margin-right: 20px;
  font-size: 18px;
  vertical-align: middle;
}

.sidebar-link:hover {
  color: #000000;
  border-color: #000000;
}

.active-link {
  color: #000000;
  font-weight: bold;
  background-color: #ffffff !important;
  padding: 8px 5px !important;
  width: 100%;
  box-sizing: content-box;
  border: 2px solid #ffffff;
  border-radius: 4px;
}

.sidebar-footer {
  width: 100%;
  display: flex;
  justify-content: left;
  padding: 0;
  margin-top: auto;
}

.sidebar-footer .sidebar-link {
  color: white;
  font-size: 17px;
  font-family: 'Arial', sans-serif;
  padding: 10px 20px;
  border-radius: 25px;
  margin-top: 15px;
  display: flex;
  align-items: left;
}

.sidebar-footer .sidebar-link i {
  margin-right: 18px;
}

.sidebar-footer .sidebar-link:hover {
  color: #000000;
}
</style>
