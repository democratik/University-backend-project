const API_URL = '/api/contacts';

const store = {
    // Pobierz wszystkie kontakty
    async getContacts() {
        const res = await fetch(API_URL);
        return await res.json();
    },

    // Pobierz jeden kontakt
    async getOne(id) {
        const res = await fetch(`${API_URL}/${id}`);
        return await res.json();
    },

    // Dodaj nowy kontakt
    async add(contact) {
        // Backend wymaga obiektu Category, dodajemy domyślną
        contact.category = { name: "MangaStyle" };
        
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact)
        });
        
        if (!res.ok) throw new Error('Błąd dodawania');
        return await res.json();
    },

    // Aktualizuj kontakt (używamy POST, bo Spring Data .save() aktualizuje, jeśli jest ID)
    async update(contact) {
        contact.category = { name: "MangaStyle" };
        
        const res = await fetch(API_URL, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact)
        });

        if (!res.ok) throw new Error('Błąd aktualizacji');
        return await res.json();
    },

    // Usuń kontakt
    async delete(id) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Błąd usuwania');
    },

    // Ulubione (Symulacja - backend nie ma pola isFavorite, ale obsłużymy to w UI)
    // Jeśli chcesz to zapisać na stałe, musisz dodać pole 'private boolean isFavorite' w Contact.java
    async toggleFavorite(id) {
        console.log("Przełączono ulubione dla ID:", id);
        // Tutaj normalnie byłby strzał do API, np. PATCH
        return true; 
    }
};