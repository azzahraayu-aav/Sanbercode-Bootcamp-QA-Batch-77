# Tugas 16 - Fitur Login OrangeHRM dengan Intercepting Network Requests

## Deskripsi
Tugas ini merupakan implementasi penggunaan `cy.intercept()` pada Cypress untuk melakukan monitoring dan validasi request HTTP yang terjadi pada fitur Login OrangeHRM.

Website yang digunakan:

https://opensource-demo.orangehrmlive.com

## Tujuan
- Memahami konsep Intercept pada Cypress.
- Melakukan monitoring request dan response API.
- Melakukan validasi status response.
- Menggunakan alias (`.as()`) dan `cy.wait()` pada request yang diintercept.

---

## Tools & Technology

- Cypress
- JavaScript
- OrangeHRM Demo
- Visual Studio Code
- Git & GitHub

---

## Test Scenario

### ORGHR_LGN_001 - Akses halaman Login
- Memastikan halaman login dapat diakses.
- Intercept request halaman login.

### ORGHR_LGN_002 - Input Username dan Password
- Memastikan field username dan password dapat diisi.
- Intercept request messages.

### ORGHR_LGN_003 - Login dengan data valid
- Login menggunakan username dan password yang valid.
- Intercept request validate.
- Validasi status response.

### ORGHR_LGN_004 - Login Username salah Password benar
- Login menggunakan username yang salah.
- Intercept request validate.

### ORGHR_LGN_005 - Login Username benar Password salah
- Login menggunakan password yang salah.
- Intercept request validate.

### ORGHR_LGN_006 - Login akun belum terdaftar
- Login menggunakan akun yang tidak terdaftar.
- Intercept request validate.

### ORGHR_LGN_007 - Login tanpa mengisi field
- Memastikan pesan Required muncul ketika field kosong.
- Intercept request messages.

### ORGHR_LGN_008 - Akses OrangeHRM Inc
- Memastikan link OrangeHRM Inc tersedia.

### ORGHR_LGN_009 - Akses Linkedin OrangeHRM
- Memastikan link Linkedin tersedia.

### ORGHR_LGN_010 - Akses Facebook OrangeHRM
- Memastikan link Facebook tersedia.

### ORGHR_LGN_011 - Akses Twitter OrangeHRM
- Memastikan link Twitter tersedia.

### ORGHR_LGN_012 - Akses Youtube OrangeHRM
- Memastikan link Youtube tersedia.

---


## Hasil Testing

Semua test case berhasil dijalankan dengan status:

```text
Passed : 12
Failed : 0
Skipped : 0
```

---

## Repository

GitHub Repository:

https://github.com/azzahraayu-aav/Sanbercode-Bootcamp-QA-Batch-77

---

## Author

Azzahra Ayu  
Sanbercode QA Automation Bootcamp Batch 77