## Start at Dev mode
### Start frontend
1. `cd frontend`;
2. `npm install`;
3. `npm start`;
### Statr backend
1. `cd backend`;
2. `go run main.go`;

## How to build
1. `make build -f build.mk`;
2. Then the binary is done. Start it directly by `./backend/bin/go-executor`;
   
## How to build image
1. `make build-image -f build.mk tag=1.0.0`;
   
## How to deploy
1. `docker run -p 8080:8080 go-executor:1.0.0`