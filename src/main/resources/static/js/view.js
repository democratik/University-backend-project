const view = {
    resetForm() {
        document.getElementById('contactForm').reset();
        document.getElementById('contactId').value = '';
        document.getElementById('cancelBtn').style.display = 'none';
        document.getElementById('submitBtn').innerHTML = '<i class="fas fa-burst"></i> 追加！ / ADD CONTACT';
    },

    fillForm(contact) {
        document.getElementById('contactId').value = contact.id;
        document.getElementById('firstName').value = contact.firstName;
        document.getElementById('lastName').value = contact.lastName;
        document.getElementById('phone').value = contact.phoneNumber;
        document.getElementById('email').value = contact.email;
        
        document.getElementById('cancelBtn').style.display = 'inline-block';
        document.getElementById('submitBtn').innerHTML = '<i class="fas fa-save"></i> 保存 / SAVE';
    },

    renderList(contacts) {
        const list = document.getElementById('contactList');
        const emptyState = document.getElementById('emptyState');
        const totalCount = document.getElementById('totalCount');
        
        totalCount.innerText = contacts.length;
        
        list.innerHTML = '';

        if (contacts.length === 0) {
            list.appendChild(emptyState);
            emptyState.style.display = 'block';
            return;
        }
        
        emptyState.style.display = 'none';

        contacts.forEach(c => {
            const li = document.createElement('li');
            li.className = 'contact-item';
            li.dataset.id = c.id;
            
            li.innerHTML = `
                <div class="contact-info">
                    <div class="contact-name">
                        <h3>${c.firstName} ${c.lastName}</h3>
                    </div>
                    <div class="contact-details">
                        <p><i class="fas fa-phone"></i> ${c.phoneNumber}</p>
                        ${c.email ? `<p><i class="fas fa-envelope"></i> ${c.email}</p>` : ''}
                        ${c.category ? `<p><i class="fas fa-tag"></i> ${c.category.name}</p>` : ''}
                    </div>
                </div>
                <div class="contact-actions">
                    <button class="action-btn btn-fav" data-action="toggleFav" title="Favorite">
                        <i class="fas fa-star" style="pointer-events: none;"></i>
                    </button>
                    <button class="action-btn btn-edit" data-action="edit" title="Edit">
                        <i class="fas fa-pen" style="pointer-events: none;"></i>
                    </button>
                    <button class="action-btn btn-delete" data-action="delete" title="Delete">
                        <i class="fas fa-trash" style="pointer-events: none;"></i>
                    </button>
                </div>
            `;
            list.appendChild(li);
        });
    }
};