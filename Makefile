start:
	docker-compose start node db

dev: up ps
	make log CONTAINER=node

up:
	docker-compose up -d node db

ps:
	docker-compose ps

restart:
	docker-compose restart

stop:
	docker-compose stop

down:
	docker-compose down

rebuild:
	docker-compose up --build --force-recreate -d

enter-bash:
	docker-compose exec $(CONTAINER) bash -it

test:
	docker build -t healthchecker:test --target test .
	docker run --rm --env-file .env healthchecker:test

log:
ifdef CONTAINER
	docker-compose logs -f $(CONTAINER)
else
	docker-compose logs -f --tail=5 db node
endif
