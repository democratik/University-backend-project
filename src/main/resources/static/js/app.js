// app.js
let currentTab = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  // Пытаемся синхронизировать локал с сервером при старте (опционально)
  // await store.syncFromLocalToServer();

  await refreshList();
});

// Форма submit
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const idRaw = document.getElementById('contactId').value;
  const id = idRaw ? Number(idRaw) : null;

  const contactData = {
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim()
  };

  if (!contactData.firstName || !contactData.lastName || !contactData.phone) {
    alert('Wypełnij imię, nazwisko i telefon.');
    return;
  }

  try {
    if (id) {
      contactData.id = id;
      await store.update(contactData);
    } else {
      await store.add(contactData);
    }
    view.resetForm();
    await refreshList();
  } catch (err) {
    console.error('Save failed', err);
    alert('Nie udało się zapisać kontaktu.');
  }
});

// Кнопка отмены
document.getElementById('cancelBtn').addEventListener('click', () => {
  view.resetForm();
});

// Обработчик кликов в списке (делегирование)
document.getElementById('contactList').addEventListener('click', async (e) => {
  const target = e.target;
  const action = target.dataset.action;
  const li = target.closest('.contact-item');

  if (!li || !action) return;

  const id = Number(li.dataset.id);
  if (Number.isNaN(id)) return;

  try {
    if (action === 'delete') {
      if (confirm('Czy na pewno chcesz usunąć ten kontakt?')) {
        await store.delete(id);
        await refreshList();
      }
    } else if (action === 'toggleFav') {
      await store.toggleFavorite(id);
      await refreshList();
    } else if (action === 'edit') {
      const contact = await store.getOne(id);
      if (contact) {
        view.fillForm(contact);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('Kontakt nie istnieje.');
        await refreshList();
      }
    }
  } catch (err) {
    console.error('Action failed', err);
    alert('Operacja nie powiodła się.');
  }
});

// Вкладки
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentTab = e.target.dataset.tab;
    await refreshList();
  });
});

async function refreshList() {
  try {
    let contacts = await store.getContacts();
    if (currentTab === 'favorites') contacts = contacts.filter(c => Boolean(c.isFavorite));
    view.renderList(contacts);
  } catch (err) {
    console.error('refreshList failed', err);
    view.renderList([]);
  }
}