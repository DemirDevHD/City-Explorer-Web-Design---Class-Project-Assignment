document.addEventListener('DOMContentLoaded', () => {

    
    
    
    const welcomeModalEl = document.getElementById('welcomeModal');
    if (welcomeModalEl) {
        
        
        const navEntries = performance.getEntriesByType("navigation");
        const isReload = navEntries.length > 0 && navEntries[0].type === "reload";
        const hasShown = sessionStorage.getItem('welcomeShown');

        if (!hasShown || isReload) {
            const hour = new Date().getHours();
            let greeting = "";
            let icon = "👋";
            
            if (hour >= 6 && hour < 12) {
                greeting = "Günaydın!";
                icon = "🌅";
            } else if (hour >= 12 && hour < 18) {
                greeting = "İyi Günler!";
                icon = "☀️";
            } else if (hour >= 18 && hour < 22) {
                greeting = "İyi Akşamlar!";
                icon = "🌆";
            } else {
                greeting = "İyi Geceler!";
                icon = "🌙";
            }
            
            document.getElementById('welcomeMessage').textContent = greeting;
            document.getElementById('welcomeIcon').textContent = icon;
            
            const welcomeModal = new bootstrap.Modal(welcomeModalEl);
            welcomeModal.show();
            
            
            sessionStorage.setItem('welcomeShown', 'true');
        }
    }

    
    
    
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    
    const savedTheme = localStorage.getItem('sivasTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    } else {
        if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
    }

    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            
            document.body.classList.toggle('dark-theme');
            
            const isDark = document.body.classList.contains('dark-theme');
            
            
            localStorage.setItem('sivasTheme', isDark ? 'dark' : 'light');
            
            
            themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
        });
    }

    
    
    
    
    
    function showAlertModal(title, message) {
        const modalEl = document.getElementById('alertModal');
        if (modalEl) {
            document.getElementById('alertModalTitle').textContent = title;
            document.getElementById('alertModalMessage').textContent = message;
            
            const bsModal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            bsModal.show();
        } else {
            
            alert(message);
        }
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const nameInput = document.getElementById('nameInput');
            const emailInput = document.getElementById('emailInput');
            const messageInput = document.getElementById('messageInput');
            
            const nameVal = nameInput.value.trim();
            const emailVal = emailInput.value.trim();
            const messageVal = messageInput.value.trim();
            
            
            nameInput.classList.remove('is-invalid');
            emailInput.classList.remove('is-invalid');
            messageInput.classList.remove('is-invalid');

            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let isValid = true;
            let errorMsg = "";

            if (nameVal === "") {
                errorMsg = "Lütfen adınızı ve soyadınızı giriniz.";
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else if (emailVal === "") {
                errorMsg = "Lütfen e-posta adresinizi giriniz.";
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else if (!emailRegex.test(emailVal)) {
                errorMsg = "Lütfen geçerli bir e-posta adresi giriniz. (Örn: isim@mail.com)";
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else if (messageVal === "") {
                errorMsg = "Lütfen bir mesaj giriniz.";
                messageInput.classList.add('is-invalid');
                isValid = false;
            }
            
            if (!isValid) {
                showAlertModal("Hata", errorMsg);
            } else {
                
                showAlertModal("Başarılı", "Mesajınız başarıyla gönderildi! Sizinle en kısa sürede iletişime geçeceğiz.");
                contactForm.reset();
                nameInput.classList.remove('is-invalid');
                emailInput.classList.remove('is-invalid');
                messageInput.classList.remove('is-invalid');
            }
        });
    }
});