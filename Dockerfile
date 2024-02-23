# Node build image
FROM node:20-alpine AS react-builder

WORKDIR /app/frontend

COPY frontend .

RUN npm install && npm run build

# Golang build image
FROM golang:1.20 AS go-builder

WORKDIR /app

COPY backend .

COPY --from=react-builder /app/frontend/build /app/build

RUN CGO_ENABLED=0 GOOS=linux go build -o ./bin/go-executor

# Golang execution image
FROM golang:1.20

WORKDIR /app

COPY --from=go-builder /app/bin/go-executor .

COPY --from=go-builder /app/build ./build

EXPOSE 8080

CMD ["./go-executor"]
