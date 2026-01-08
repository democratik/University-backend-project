const API_URL = '/api/contacts';

const store = {
    async getContacts() {
        const res = await fetch(API_URL);
        return await res.json();
    },

    async getOne(id) {
        const res = await fetch(`${API_URL}/${id}`);
        return await res.json();
    },

    async add(contact) {
        contact.category = { name: "inprogress" };
        
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact)
        });
        
        if (!res.ok) throw new Error('Błąd dodawania');
        return await res.json();
    },

    async update(contact) {
        contact.category = { name: "inprogress" };
        
        const res = await fetch(API_URL, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact)
        });

        if (!res.ok) throw new Error('Błąd aktualizacji');
        return await res.json();
    },

    async delete(id) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Błąd usuwania');
    },

    async toggleFavorite(id) {
        console.log("Przełączono ulubione dla ID:", id);
        return true; 
    }
};