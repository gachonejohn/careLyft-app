# FINAL PROJECTS

# python project repo:

```
https://github.com/gachonejohn/ecommerce-django

# careLyft

# Database schema

```

    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100)  NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        hashedPassword VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

```

```
