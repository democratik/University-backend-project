# Aplikacja Backendowa - Książka Adresowa (Address Book)

## Autory:
* [Dmytro Ilchenko]
* [Amirseit Kystaubay]

Projekt zaliczeniowy z przedmiotu "Technologie backendowe". Aplikacja służy do zarządzania kontaktami, oferując funkcjonalności CRUD, generowanie raportów oraz powiadomienia w czasie rzeczywistym.

## Realizacja Wymagań Projektowych

Poniżej przedstawiono status realizacji poszczególnych punktów z zadania projektowego:

- [x] **Kontrolery i klasy pomocnicze:** Zaimplementowano `ContactController` oraz warstwę serwisu `ContactService` oddzielającą logikę biznesową
- [x] **Baza danych i JPA:**
    - Wykorzystano Spring Data JPA
    - Zaimplementowano metody `findBy...` (Query Creation)
    - Zaimplementowano `@Query` (JPQL)
    - Zaimplementowano `nativeQuery` (SQL)
- [x] **Logi aplikacji:** Zastosowano adnotację `@Slf4j` do logowania operacji (tworzenie, usuwanie, pobieranie danych)
- [x] **Profile (dev i prod):** Skonfigurowano pliki `application-dev.properties` oraz `application-prod.properties`
- [x] **WebSocket:** Powiadomienia w czasie rzeczywistym o dodaniu nowego kontaktu
- [x] **Plik properties:** Konfiguracja aplikacji wydzielona do `application.properties`
- [x] **Generowanie raportu XLS:** Możliwość pobrania listy kontaktów w formacie Excel (Apache POI)
- [x] **Integracja z repozytorium:** Kod źródłowy znajduje się w systemie kontroli wersji Git

---

## Technologie

* **Java 17**
* **Spring Boot 3.x** (Web, Data JPA, Validation, WebSocket)
* **H2 Database** (In-memory database dla profilu dev)
* **Lombok** (Redukcja boilerplate code)
* **Apache POI** (Generowanie plików Excel)
* **OpenAPI / Swagger** (Dokumentacja API)

---

## Instrukcja Uruchomienia

1.  **Sklonuj repozytorium:**
    ```bash
    git clone [https://github.com/twoj-nick/twoj-projekt.git](https://github.com/twoj-nick/twoj-projekt.git)
    ```
2.  **Uruchom aplikację** (korzystając z Maven Wrapper):
    ```bash
    ./mvnw spring-boot:run
    ```
3.  Aplikacja domyślnie startuje na porcie **8080**.

---

## Linki i Testowanie

### UWAGA
Nie otwieraj pliku `src/main/resources/static/index.html` bezpośrednio w przeglądarce (dwuklikiem) ani przy użyciu wtyczek typu "Live Server" (np. na porcie 5500). Spowoduje to błąd połączenia (CORS/404).
Ponieważ plik jest serwowany jako zasób statyczny Spring Boot, **jedynym poprawnym adresem** do testowania jest:
**http://localhost:8080/index.html**

### 1. Dokumentacja API (Swagger UI)
Tutaj można testować wszystkie endpointy (dodawanie, usuwanie, pobieranie kontaktów oraz raportów).
**http://localhost:8080/swagger-ui/index.html**

2. Baza Danych (H2 Console)
Podgląd bazy danych w pamięci
**http://localhost:8080/h2-console**
* **JDBC URL:** `jdbc:h2:mem:addressbookdb`
* **User:** `sa`
* **Password:** `password`

### 3. Testowanie WebSocket
Prosta strona kliencka do odbierania powiadomień o nowych kontaktach.
**http://localhost:8080/index.html**

**Jak przetestować:**
1. Otwórz stronę `index.html` w przeglądarce.
2. Poczekaj na status "Connected".
3. W osobnej karcie (przez Swagger) wyślij żądanie `POST` tworzące nowy kontakt.
4. Na stronie `index.html` pojawi się powiadomienie.

### 4. Pobieranie Raportu Excel
Aby pobrać raport, wykonaj zapytanie GET na endpoint:
`/api/contacts/report` (dostępne również przez Swagger)


