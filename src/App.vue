<script setup>
</script>

<template>
  <div class="app-shell">

    <header class="app-header">
      <div class="brand">
        <span class="logo-dot"></span>
        <strong>LabTrack</strong>
      </div>

      <nav class="top-nav">
        <router-link to="/" class="nav-link">
          Equipment
        </router-link>

        <router-link to="/equipment/new" class="nav-link">
          Create new
        </router-link>
      </nav>
    </header>
    <main class="app-content">
      <router-view />
    </main>

  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: var(--bg);
}
.app-header {
  position: sticky;
  top: 0;
  z-index: 20;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 18px;

  background: white;
  border-bottom: 1px solid #e5e7eb;
}
.brand {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 18px;
}

.logo-dot {
  width: 10px;
  height: 10px;
  background: var(--primary);
  border-radius: 50%;
}

.top-nav {
  display: flex;
  gap: 14px;
}

.nav-link {
  text-decoration: none;
  color: #374151;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 8px;
}
.nav-link.router-link-active {
  background: #e0e7ff;
  color: var(--primary-dark);
  font-weight: 600;
}
.app-content {
  padding: 18px;
  max-width: 1100px;
  margin: auto;
}
</style>