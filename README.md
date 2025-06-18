# CI-Test Setup Guide

## 1. Cài đặt các công cụ cần thiết

### Cài đặt Chocolatey và jq

Mở PowerShell bằng quyền **Administrator** và chạy:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; `
[System.Net.ServicePointManager]::SecurityProtocol = `
[System.Net.ServicePointManager]::SecurityProtocol -bor 3072; `
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Sau khi chạy xong, tiếp tục chạy:

```powershell
choco install jq -y
```

---

## 2. Setup dự án

### Cấu hình GitHub

Mở **Command Prompt** và chạy:

```bash
git config --global user.name "username github của bạn"
git config --global user.email "email của bạn"
```

### Tải dự án

Mở **Command Prompt** tại nơi bạn muốn chứa project và chạy:

```bash
git clone https://github.com/tungarisdev/ci-test.git
```

### Đổi token GitHub

1. Truy cập: [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Chọn **Generate new token (classic)**
3. Nhập tên vào phần **Note**, tick chọn các scope sau:
   - `repo`
   - `workflow`
   - `read:packages`
4. Click **Generate token**, sau đó **copy token vừa tạo**

**Cập nhật token vào file `deploy.bat`:**

- Mở thư mục dự án `ci-test` → `src`
- Mở file `deploy.bat` bằng **Notepad**
- Tìm dòng:

```bat
set TOKEN=
```

- Dán token bạn vừa copy vào sau dấu `=`, sau đó **lưu lại**

---

### Tải Tomcat

1. Vào ổ **D:** tạo thư mục tên **Tomcat**
2. Truy cập link sau để tải Tomcat về và giải nén vào thư mục vừa tạo:
   - 📥 [Link Google Drive](https://drive.google.com/file/d/1-Q777RlqPbJt3_TFWo41yHtLxBAtudws/view)

---

## 3. Thực hành

Vào thư mục dự án `ci-test`, mở **Command Prompt** và chạy:

### Tạo nhánh mới

```bash
git checkout -b feature/têncủabạn
```

### Đẩy code lên nhánh

```bash
git push -u origin feature/têncủabạn
```

### Kiểm tra kết quả CI

1. Truy cập: [https://github.com/tungarisdev/ci-test](https://github.com/tungarisdev/ci-test)
2. Nếu thấy có dấu ✅ (success) thì:

### Chạy file triển khai

- Vào `ci-test/src`, **click đúp** vào file `deploy.bat`

### Nếu chạy thành công sẽ thấy log sau:

```text
=== LAY RUN ID MOI NHAT ===
=== LAY ARTIFACT URL ===
=== TAI ARTIFACT ===
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100  1296  100  1296    0     0    838      0  0:00:01  0:00:01 --:--:--  1721
=== GIAI NEN ===
=== TIM WAR FILE VA COPY ===
        1 file(s) copied.
=== WAR DA COPY. ===
Press any key to continue . . .
```

🎉 **Chúc mừng, bạn đã triển khai thành công!**
