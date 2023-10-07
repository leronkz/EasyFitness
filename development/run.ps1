$env:COMPOSE_PROJECT_NAME = "easy-fitness"
docker-compose up -d postgres
docker-compose up -d minio
Start-Sleep -Seconds 5
docker-compose up -d minio-configurator
Read-Host -Prompt 'Press Enter to exit...'
docker-compose down --remove-orphans --rmi local