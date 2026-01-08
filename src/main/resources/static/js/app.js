let currentTab = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  await refreshList();
});

document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const idRaw = document.getElementById('contactId').value;
  const id = idRaw ? Number(idRaw) : null;
  const contactData = {
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    phoneNumber: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    category: { name: "inprogress" }
  };

  if (!contactData.firstName || !contactData.lastName || !contactData.phoneNumber) {
    alert('Wypełnij imię, nazwisko i telefon');
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
    
    // Можна додати красиве повідомлення про успіх
    console.log("Zapisano pomyślnie!"); 
  } catch (err) {
    console.error('Save failed', err);
    alert('Nie udało się zapisać kontaktu: ' + err.message);
  }
});

document.getElementById('cancelBtn').addEventListener('click', () => {
  view.resetForm();
});

document.getElementById('contactList').addEventListener('click', async (e) => {
  const target = e.target;
  // Шукаємо кнопку, навіть якщо клікнули по іконці всередині
  const btn = target.closest('.action-btn'); 
  const li = target.closest('.contact-item');

  if (!li || !btn) return;

  const action = btn.dataset.action; // Беремо action з кнопки
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
        alert('Kontakt nie istnieje');
        await refreshList();
      }
    }
  } catch (err) {
    console.error('Action failed', err);
    alert('Operacja nie powiodła się');
  }
});

async function refreshList() {
  try {
    let contacts = await store.getContacts();
    // Фільтрація обраних (якщо треба)
    if (currentTab === 'favorites') {
        // Оскільки в базі немає поля isFavorite, це поки просто імітація
        // contacts = contacts.filter(c => c.isFavorite); 
    }
    view.renderList(contacts);
  } catch (err) {
    console.error('refreshList failed', err);
    view.renderList([]);
  }
}