document.addEventListener('DOMContentLoaded', function() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    const modal = document.getElementById('serviceModal');
    const btns = document.querySelectorAll('.btn-order');
    const closeBtn = document.querySelector('.close-btn');
    const serviceSelect = document.getElementById('service');
    const certificateSelect = document.getElementById('certificate');
    const priceInfo = document.getElementById('priceInfo');
    const addressGroup = document.getElementById('addressGroup');

    btns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            modal.style.display = 'block';
            
            const service = this.parentElement.querySelector('h3').textContent;
            if(service.includes('Hatm')) {
                serviceSelect.value = 'hatim';
            } else if(service.includes('Yasin')) {
                serviceSelect.value = 'yasin';
            }
            
            certificateSelect.value = '';
            priceInfo.style.display = 'none';
            addressGroup.style.display = 'none';
        });
    });

    certificateSelect.addEventListener('change', function() {
        const selectedService = serviceSelect.value;
        const addressGroup = document.getElementById('addressGroup');
        const priceInfo = document.getElementById('priceInfo');
        
        if(this.value === 'evet') {
            addressGroup.style.display = 'block';
            priceInfo.style.display = 'block';
            
            const price = selectedService === 'hatim' ? '350' : '75';
            document.getElementById('certificatePrice').textContent = price;
        } else {
            addressGroup.style.display = 'none';
            priceInfo.style.display = 'none';
        }
    });

    serviceSelect.addEventListener('change', function() {
        if(certificateSelect.value === 'evet') {
            const price = this.value === 'hatim' ? '350' : '75';
            document.getElementById('certificatePrice').textContent = price;
        }
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.getElementById('serviceForm').reset();
        priceInfo.style.display = 'none';
        addressGroup.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    document.getElementById('serviceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const service = serviceSelect.value;
        const certificate = certificateSelect.value;
        const forName = document.getElementById('forName').value;
        const motherName = document.getElementById('motherName').value;
        const fatherName = document.getElementById('fatherName').value;
        const birthDate = document.getElementById('birthDate').value;
        const deathDate = document.getElementById('deathDate').value;
        
        let message = `Form başarıyla gönderildi.\n\n` +
                     `Okunacak Kişi: ${forName}\n` +
                     `Anne Adı: ${motherName}\n` +
                     `Baba Adı: ${fatherName}\n` +
                     `Doğum Tarihi: ${birthDate}\n` +
                     `Vefat Tarihi: ${deathDate}\n\n`;

        if (certificate === 'evet') {
            const price = service === 'hatim' ? '350' : '75';
            const serviceType = service === 'hatim' ? 'Hatm-i Şerif' : 'Yasin-i Şerif';
            const address = document.getElementById('address').value;
            
            message += `${serviceType} Sertifika Ücreti: ${price} TL\n` +
                      `Teslimat Adresi: ${address}\n\n`;
        } else {
            message += 'Sertifika talep edilmemiştir.\n\n';
        }

        message += `Not: KUR'AN-I KERİM okuma hizmetimiz tamamen ücretsizdir.\n` +
                  `En kısa sürede sizinle iletişime geçeceğiz.`;

        alert(message);
        modal.style.display = 'none';
        this.reset();
    });
}); 