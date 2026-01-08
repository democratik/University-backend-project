# Książka Adresowa

**LINK NA GITHUB**
[https://github.com/democratik/University-backend-project](https://github.com/democratik/University-backend-project)

**Autorzy:**
* Dmytro Ilchenko
* Amirseit Kystaubay


## Główne Funkcjonalności

Aplikacja realizuje wszystkie wymagania projektowe, w tym:
* **Pełny CRUD:** Dodawanie, edycja, usuwanie i wyświetlanie kontaktów.
* **Relacje w bazie danych:** Kontakty przypisane do kategorii (relacja `@OneToMany`).
* **Zaawansowane wyszukiwanie:** Wykorzystanie Spring Data JPA, JPQL oraz Native Queries.
* **WebSocket:** Automatyczne odświeżanie listy kontaktów u wszystkich klientów po dodaniu wpisu.
* **Raporty Excel:** Generowanie i pobieranie listy kontaktów w formacie `.xlsx` (Apache POI).
* **Nowoczesny UI:** Responsywny interfejs webowy (HTML/CSS/JS) w stylu "Clean SaaS".
* **Profile i Logi:** Skonfigurowane środowiska (dev/prod) oraz logowanie operacji.


## Technologie

* **Java 17** & **Spring Boot 3.x**
* **Baza danych:** H2 (In-memory)
* **Frontend:** Vanilla JS, CSS3, HTML5
* **Narzędzia:** Lombok, Apache POI (Excel), Swagger/OpenAPI


## Instrukcja Uruchomienia

1.  **Uruchom aplikację** (korzystając z Maven Wrapper):
    ```bash
    ./mvnw clean spring-boot:run
    ```
2.  Aplikacja uruchomi się na porcie **8080**.


## Linki do Aplikacji
Interfejs użytkownika jest serwowany bezpośrednio przez Spring Boot
Nie używaj wtyczek typu "Live Server" ani nie otwieraj pliku `.html` z dysku

**Główna aplikacja (Interfejs):**
[http://localhost:8080/index.html](http://localhost:8080/index.html)

**Dokumentacja API (Swagger UI):**
[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

**Konsola Bazy Danych (H2):**
[http://localhost:8080/h2-console](http://localhost:8080/h2-console)
*(JDBC URL: `jdbc:h2:mem:addressbookdb`, User: `sa`, Password: `password`)*