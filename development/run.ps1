$env:COMPOSE_PROJECT_NAME = "easy-fitness"

try {
  docker-compose up
  Start-Sleep 5
}
finally {
  docker-compose down --remove-orphans --rmi local
}
