.DEFAULT_GOAL := help

GREEN  := \033[0;32m
YELLOW := \033[0;33m
CYAN   := \033[0;36m
RESET  := \033[0m

.PHONY: help \
        install install-server install-client \
        dev dev-server dev-client \
        build start migrate \
        docker-up docker-down docker-logs \
        clean clean-build

# ── Help ─────────────────────────────────────────────────────────────────────

help: ## Show available commands
	@echo ""
	@echo "  $(CYAN)CivicPulse — available make targets$(RESET)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-18s$(RESET) %s\n", $$1, $$2}'
	@echo ""

# ── Install ───────────────────────────────────────────────────────────────────

install: install-server install-client ## Install all dependencies

install-server: ## Install server dependencies
	@echo "$(YELLOW)▶ Installing server dependencies...$(RESET)"
	cd server && npm install

install-client: ## Install client dependencies
	@echo "$(YELLOW)▶ Installing client dependencies...$(RESET)"
	cd client && npm install

# ── Development ───────────────────────────────────────────────────────────────

dev: ## Start client + server concurrently (requires: npm i -g concurrently)
	@echo "$(YELLOW)▶ Starting development servers...$(RESET)"
	npx concurrently \
		--names "API,UI" \
		--prefix-colors "cyan,magenta" \
		--kill-others-on-fail \
		"cd server && npm run server" \
		"cd client && npm start"

dev-server: ## Start only the Express API (nodemon)
	cd server && npm run server

dev-client: ## Start only the React client
	cd client && npm start

# ── Production ────────────────────────────────────────────────────────────────

build: ## Build the React client for production
	@echo "$(YELLOW)▶ Building React client...$(RESET)"
	cd client && npm run build
	@echo "$(GREEN)✔ Build complete → client/build/$(RESET)"

start: ## Start the Express server in production mode
	cd server && NODE_ENV=production npm start

migrate: ## Run the timeline data migration (run once after deploy)
	@echo "$(YELLOW)▶ Running timeline migration...$(RESET)"
	cd server && npm run migrate:timeline

# ── Docker ────────────────────────────────────────────────────────────────────

docker-up: ## Start local dev stack (MongoDB + API) via docker-compose
	docker compose up --build -d
	@echo "$(GREEN)✔ Stack running. API → http://localhost:8080$(RESET)"

docker-down: ## Stop and remove local dev containers
	docker compose down

docker-logs: ## Tail logs from all running containers
	docker compose logs -f

# ── Clean ─────────────────────────────────────────────────────────────────────

clean: ## Remove node_modules and build output
	@echo "$(YELLOW)▶ Cleaning...$(RESET)"
	rm -rf client/build server/node_modules client/node_modules
	@echo "$(GREEN)✔ Done$(RESET)"

clean-build: ## Remove only the client build output
	rm -rf client/build
