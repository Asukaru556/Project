<script setup>
import { RouterLink, RouterView } from 'vue-router'
import logo from '@/assets/logo.svg'
import Navigation from '@/components/Navigation.vue'
import EventList from "@/UI/EventList.vue";
import { ref } from 'vue'

const menuLinks = ref([
  {
    id: 0,
    url: '/login',
    label: 'Логин',
  },
  {
    id: 1,
    url: '/register',
    label: 'Регистрация',
  },
])
</script>

<template>
  <header>
    <RouterLink to="/">
      <img :src="logo" :width="60" />
    </RouterLink>
    <Navigation :items="menuLinks" />
  </header>

  <div class="wrap">
    <sidebar>
      <RouterLink to="/events" class="events-link">
        <button class="sidebarNavigation">Events</button>
      </RouterLink>
    </sidebar>
    <content>
      <RouterView />
    </content>
  </div>

  <footer>copyright 2025 site.ro</footer>
</template>

<style>
header {
  height: 10vh;
  background: #282828;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
}

header a {
  text-decoration: none;
}

header nav {
  display: flex;
}

header nav a {
  display: block;
  padding: 10px 20px;
  color: #f2f2f2;
  transition: 0.3s;
}

header nav a:hover {
  background: #2c3e50;
}

.wrap {
  display: flex;
  height: 85vh;
}

sidebar {
  width: 300px;
  background: #cbd8e6;
  padding: 20px;
}

footer {
  display: flex;
  align-items: center;
  height: 5vh;
  background: #333;
  padding: 0 20px;
  color: #f8f8f8;
}

content {
  padding: 20px;
}

.events-link {
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
}

.sidebarNavigation {
  padding: 10px 25px;
  background: #2c3e50;
  width: 300px;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.sidebarNavigation:hover {
  background-color: #5a49ac;
  outline: 2px solid #3c3e67;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}
</style>
