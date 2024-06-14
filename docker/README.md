# Docker compose deployment

1. Create a file `db_password.txt` with the password of the user of the database
2. Run `docker compose up`

## Run for development

```
docker compose -f .\compose.yml -f .\compose.dev.yml up
```
