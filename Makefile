# Comandos para Docker Compose

up:
	docker compose up -d
build:
	docker compose build
down:
	docker compose down
logs:
	docker compose logs -f --tail=100
stop:
	docker compose stop

# Dev local (sem Docker)
dev:
	npm run dev

# Comandos de monitoramento

monitor-check:
	python3 scripts/frontend_monitoring_report.py

monitor-check-json:
	python3 scripts/frontend_monitoring_report.py --json

metrics-local:
	curl -s http://localhost:3001/metrics | head -50

# Instalar dependencias
install:
	npm install
