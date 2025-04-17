import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useEventsStore = defineStore('events', () => {
  const events = ref([
    {
      id: 1,
      title: 'Самолет',
      description: 'Самолет в Дубай',
      time: '18:00',
      author: 'Askar',
    },
    {
      id: 2,
      title: 'Магазин',
      description: 'Купить одежду',
      time: '13:00',
      author: 'Askar',
    },
    {
      id: 3,
      title: 'Концерт',
      description: 'Сходить на концерт КиШ',
      time: '20:00',
      author: 'Askar',
    },
    {
      id: 4,
      title: 'Спортзал',
      description: 'Сходить в спортзал',
      time: '9:00',
      author: 'Askar',
    },
    {
      id: 5,
      title: 'Кафе',
      description: 'Сходить в кафе',
      time: '12:00',
      author: 'Askar',
    },
  ])
  function deleteEvents(id) {

    events.value = events.value.filter((el) => el.id !== id)
    console.log(events.value)
  }

  function updateEvent(updatedEvent) {
    const index = events.value.findIndex(e => e.id === updatedEvent.id)
    if (index !== -1) {
      events.value[index] = updatedEvent
    }
  }

  function addEvent(newEvent) {
    const maxId = Math.max(...events.value.map(e => e.id), 0)
    events.value.push({
      ...newEvent,
      id: maxId + 1,
      time: newEvent.time || '12:00' // Дефолтное время
    })
  }

  return { events, deleteEvents, updateEvent, addEvent}
})






