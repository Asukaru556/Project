// stores/MyStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:7000/events'

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchEvents() {
      try {
        this.loading = true
        const response = await axios.get(API_URL)
        // Нормализация данных: гарантируем числовой ID
        this.events = (response.data || []).map(event => ({
          ...event,
          id: Number(event.id)
        }))
      } catch (e) {
        this.error = e.message
        console.error('Ошибка загрузки событий:', e)
      } finally {
        this.loading = false
      }
    },

    async updateEvent(updatedEvent) {
      try {
        const response = await axios.put(
          `${API_URL}/${updatedEvent.id}`,
          updatedEvent
        );

        // Явное обновление через map
        this.events = this.events.map(event =>
          event.id === updatedEvent.id ? response.data : event
        );

        return response.data;
      } catch (e) {
        console.error('Update error:', e.response?.data || e.message);
        throw new Error(e.response?.data?.message || 'Ошибка обновления');
      }
    },

    async addEvent(newEvent) {
      try {
        this.loading = true
        const response = await axios.post(API_URL, {
          ...newEvent,
          time: newEvent.time.replace(/:/g, '') // Формат HHmm
        })

        // Добавляем в хранилище
        this.events.push({
          ...response.data,
          id: Number(response.data.id),
          time: response.data.time.replace(/(\d{2})(\d{2})/, '$1:$2')
        })

        return response.data

      } catch (e) {
        console.error('Ошибка создания:', e.response?.data || e.message)
        throw new Error(e.response?.data?.message || 'Не удалось создать событие')
      } finally {
        this.loading = false
      }
    },

    async deleteEvent(eventId) {
      try {
        this.loading = true;
        const numericId = Number(eventId); // Преобразование ID в число

        await axios.delete(`${API_URL}/${numericId}`);

        this.events = this.events.filter(event =>
          event.id !== numericId // Сравниваем числа
        );

      } catch (e) {
        console.error('Delete error:', e.response?.data || e.message);
        throw new Error('Ошибка удаления: ' + (e.response?.data?.message || e.message));
      } finally {
        this.loading = false;
      }
    }
  }
})