// app.js

// Hàm kiểm tra định dạng email
function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Hàm kiểm tra độ dài username
function isValidUsername(username) {
  return username.length >= 6 && username.length <= 18;
}

// Hàm kiểm tra độ dài password
function isValidPassword(password) {
  return password.length >= 8 && password.length <= 20;
}

// Hàm kiểm tra nếu password và verify password trùng khớp
function arePasswordsMatching(password, verifyPassword) {
  return password === verifyPassword;
}

// Hàm xử lý submit form
document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Ngừng việc gửi form mặc định

  // Lấy giá trị từ các trường input
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const verifyPassword = document.getElementById('verify-password').value;

  let isValid = true;

  // Xóa thông báo lỗi cũ
  document.getElementById('username-error').textContent = '';
  document.getElementById('email-error').textContent = '';
  document.getElementById('password-error').textContent = '';
  document.getElementById('verify-password-error').textContent = '';

  // Kiểm tra username
  if (!isValidUsername(username)) {
    document.getElementById('username-error').textContent = 'Username must be between 6 and 18 characters.';
    isValid = false;
  }

  // Kiểm tra email
  if (!isValidEmail(email)) {
    document.getElementById('email-error').textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  // Kiểm tra password
  if (!isValidPassword(password)) {
    document.getElementById('password-error').textContent = 'Password must be between 8 and 20 characters.';
    isValid = false;
  }

  // Kiểm tra verify password
  if (!arePasswordsMatching(password, verifyPassword)) {
    document.getElementById('verify-password-error').textContent = 'Passwords do not match.';
    isValid = false;
  }

  // Nếu form hợp lệ, thực hiện gửi form (hoặc hành động cần thiết)
  if (isValid) {
    alert('Form submitted successfully!');
    // Gửi form hoặc thực hiện các thao tác khác sau khi form hợp lệ.
    // Ví dụ: gửi dữ liệu lên server hoặc lưu trữ thông tin người dùng
  }
});
