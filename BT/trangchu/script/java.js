// JavaScript Document
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('adopt-form');
	const successBox = document.querySelector('.form-success');

	if (!form) return;

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		// Lấy giá trị radio đã chọn (nếu có)
		function getRadioValue(name) {
			const checked = form.querySelector(`input[name="${name}"]:checked`);
			return checked ? checked.value : '';
		}

		// Validate riêng cho radio group (vì required trên radio
		// chỉ báo lỗi ở input đầu tiên trong nhóm, dễ gây hiểu nhầm)
		const housing = getRadioValue('housing');
		const experience = getRadioValue('experience');

		if (!housing) {
			alert('Vui lòng chọn loại nhà ở.');
			return;
		}
		if (!experience) {
			alert('Vui lòng chọn đã từng nuôi mèo hay chưa.');
			return;
		}

		// Validate tuổi tối thiểu 18 (phòng trường hợp input number bị sửa)
		const age = parseInt(document.getElementById('age').value, 10);
		if (isNaN(age) || age < 18) {
			alert('Người nhận nuôi phải từ 18 tuổi trở lên.');
			return;
		}

		// Validate checkbox cam kết
		const confirmCheck = form.querySelector('.confirm-check input[type="checkbox"]');
		if (!confirmCheck.checked) {
			alert('Vui lòng đồng ý với cam kết nhận nuôi trước khi gửi.');
			return;
		}

		// Thu thập toàn bộ dữ liệu form
		const formData = {
			hoTen: document.getElementById('fullname').value.trim(),
			tuoi: age,
			soDienThoai: document.getElementById('phone').value.trim(),
			email: document.getElementById('email').value.trim(),
			diaChi: document.getElementById('address').value.trim(),
			loaiNhaO: housing,
			daTungNuoi: experience,
			thuCungHienTai: document.getElementById('current-pets').value.trim(),
			maSoMeo: document.getElementById('pet-code').value.trim(),
			lyDo: document.getElementById('reason').value.trim(),
			thoiGianGui: new Date().toISOString()
		};

		// Lưu vào localStorage (gộp với các hồ sơ đã gửi trước đó, nếu có)
		try {
			const dsHoSo = JSON.parse(localStorage.getItem('hoSoNhanNuoi') || '[]');
			dsHoSo.push(formData);
			localStorage.setItem('hoSoNhanNuoi', JSON.stringify(dsHoSo));
		} catch (err) {
			console.error('Không thể lưu vào localStorage:', err);
		}

		// Log ra console để kiểm tra
		console.log('Hồ sơ đăng ký nhận nuôi:', formData);

		// Ẩn form, hiện thông báo thành công
		form.style.display = 'none';
		if (successBox) {
			successBox.style.display = 'block';
			successBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	});
});
 document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các nút Quyên góp
    const donateButtons = document.querySelectorAll('.open-donate');
    const donatePopup = document.getElementById('donate-popup');
    const closeBtn = document.getElementById('donate-close');

    // Hàm mở popup
    donateButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (donatePopup) {
                donatePopup.style.display = 'flex'; // Hiển thị popup
            }
        });
    });

    // Hàm đóng popup
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (donatePopup) {
                donatePopup.style.display = 'none'; // Ẩn popup
            }
        });
    }

    // Đóng popup khi click ra ngoài vùng popup-box
    window.addEventListener('click', function(event) {
        if (event.target === donatePopup) {
            donatePopup.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('ct-track');
    const nextBtn = document.getElementById('ct-next');
    const prevBtn = document.getElementById('ct-prev');
    const dots = document.querySelectorAll('#ct-dots .dot');
    
    if (!track || !nextBtn || !prevBtn) return;

    let currentIndex = 0;
    const totalPages = document.querySelectorAll('.carousel-page').length;

    function updateSlider() {
        // Dịch chuyển thanh track sang trái dựa theo index trang hiện tại
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Đổi màu dấu chấm tròn tương ứng
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    nextBtn.addEventListener('click', function() {
        if (currentIndex < totalPages - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Quay về trang đầu
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalPages - 1; // Tới trang cuối
        }
        updateSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSlider();
        });
    });
});