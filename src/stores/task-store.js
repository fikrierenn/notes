import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

// Dummy görev verileri
const dummyTasks = [
  {
    id: nanoid(),
    title: 'Sunum Hazırlığı',
    created_at: '2024-06-01',
    status: 'Açık',
    assigned_to_user_id: 'user1',
    created_by_user_id: 'user1',
    summary: 'Yönetim toplantısı için sunum hazırlanacak.',
    tags: ['toplantı', 'sunum'],
    category: 'İş',
    due_date: '2024-06-10',
    completed_at: null,
    postponed_count: 1,
    postponed_dates: [
      { old_date: '2024-06-07', new_date: '2024-06-10', changed_at: '2024-06-05' }
    ]
  },
  {
    id: nanoid(),
    title: 'Alışveriş Listesi',
    created_at: '2024-06-02',
    status: 'Açık',
    assigned_to_user_id: 'user2',
    created_by_user_id: 'user1',
    summary: 'Haftalık market alışverişi yapılacak.',
    tags: ['alışveriş'],
    category: 'Kişisel',
    due_date: '2024-06-08',
    completed_at: null,
    postponed_count: 0,
    postponed_dates: []
  },
  {
    id: nanoid(),
    title: 'Proje Teslimi',
    created_at: '2024-06-03',
    status: 'Tamamlandı',
    assigned_to_user_id: 'user3',
    created_by_user_id: 'user2',
    summary: 'Müşteriye proje teslim edilecek.',
    tags: ['proje', 'teslim'],
    category: 'İş',
    due_date: '2024-06-05',
    completed_at: '2024-06-05',
    postponed_count: 2,
    postponed_dates: [
      { old_date: '2024-06-03', new_date: '2024-06-04', changed_at: '2024-06-02' },
      { old_date: '2024-06-04', new_date: '2024-06-05', changed_at: '2024-06-04' }
    ]
  }
];

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [...dummyTasks]
  }),
  actions: {
    loadTasks() {
      // Dummy veriyi tekrar yükler (ileride SQLite/Supabase ile değiştirilecek)
      this.tasks = [...dummyTasks];
    },
    addTask(task) {
      this.tasks.push({
        ...task,
        id: nanoid(),
        created_at: new Date().toISOString(),
        postponed_count: 0,
        postponed_dates: [],
        status: 'Açık'
      });
    },
    updateTask(updatedTask) {
      const idx = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (idx !== -1) this.tasks[idx] = { ...this.tasks[idx], ...updatedTask };
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    }
  }
}); 