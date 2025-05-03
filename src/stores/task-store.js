import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [
      { id: 1, title: 'Vue projesi başlat', status: 'Açık', created_at: new Date(), assigned_to_user_id: 1, created_by_user_id: 1, summary: '', tags: [] },
      { id: 2, title: 'Supabase bağlantısı kur', status: 'Açık', created_at: new Date(), assigned_to_user_id: 1, created_by_user_id: 1, summary: '', tags: [] },
    ],
  }),
  actions: {
    addTask(task) {
      this.tasks.push(task);
    },
    completeTask(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) task.status = 'Tamamlandı';
    },
  },
}); 