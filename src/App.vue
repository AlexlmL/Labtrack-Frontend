<script setup></script>

<template>
  <div>

    <header style="padding: 12px; border-bottom: 1px solid #ddd;">
      <h2>Equipment Management</h2>

      <nav style="display: flex; gap: 12px;">
        <router-link to="/equipment">Equipment</router-link>
        <router-link to="/equipment/new">Create new</router-link>
      </nav>
    </header>

    <main style="padding: 16px;">
      <router-view />
    </main>

  </div>
</template>

<style scoped></style>
