# Tugas 17 - Fitur Login OrangeHRM - Page Object Model (POM)

## Deskripsi Project

Project ini merupakan tugas Automation Testing menggunakan Cypress dengan menerapkan konsep **Page Object Model (POM)** pada fitur Login website OrangeHRM.

Website yang digunakan:

https://opensource-demo.orangehrmlive.com/

Tujuan implementasi POM adalah untuk memisahkan locator dan action dari test case sehingga script menjadi lebih rapi, mudah dipelihara (maintainable), reusable, dan mudah dikembangkan.

---

## Teknologi yang Digunakan

* Cypress
* JavaScript
* Page Object Model (POM)

---

## Struktur Folder

```bash
cypress
│
├── e2e
│   └── pom
│       └── login.cy.js
│
├── fixtures
│   └── loginData.json
│
├── pages
│   └── LoginPage.js
│
└── support
```

### Keterangan

#### pages/LoginPage.js

Berisi:

* Locator element halaman Login
* Method/action yang digunakan pada halaman Login

#### fixtures/loginData.json

Berisi data testing yang digunakan pada proses login.

#### e2e/pom/login.cy.js

Berisi test case automation yang menggunakan Page Object Model.

---

## Implementasi Page Object Model (POM)

Penerapan POM dilakukan dengan memisahkan:

### Page Object

Menyimpan:

* Locator username
* Locator password
* Locator tombol login
* Method login
* Method validasi

### Test Script

Berisi:

* Skenario pengujian
* Assertion
* Pemanggilan method dari Page Object

### Test Data

Data login disimpan pada file fixture sehingga mudah dikelola dan digunakan kembali.

---

## Test Case

| ID Test Case  | Deskripsi                                      |
| ------------- | ---------------------------------------------- |
| ORGHR_POM_001 | Akses halaman Login                            |
| ORGHR_POM_002 | Login menggunakan username dan password valid  |
| ORGHR_POM_003 | Login dengan username salah dan password benar |
| ORGHR_POM_004 | Login dengan username benar dan password salah |
| ORGHR_POM_005 | Login menggunakan akun yang belum terdaftar    |
| ORGHR_POM_006 | Login tanpa mengisi username dan password      |

---


## Keuntungan Menggunakan POM

* Mengurangi duplikasi kode
* Memudahkan maintenance ketika locator berubah
* Meningkatkan readability test script
* Memisahkan data, action, dan test scenario
* Membuat automation testing lebih scalable

---

## Author

Azzahra Ayu  
Sanbercode QA Automation Bootcamp Batch 77