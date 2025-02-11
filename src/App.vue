<template>
  <div id="app">
    <!-- Sidebar Component -->
    <Sidebar />

    <!-- Main content area for routed components -->
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
/* Layout styling so the sidebar and main content are displayed side by side */
#app {
  display: flex;
}

/* Adjust main content to accommodate the sidebar's width */
.main-content {
  margin-left: 200px; /* Same as the sidebar width */
  width: calc(100% - 200px);
  padding: 20px;
}
</style>
