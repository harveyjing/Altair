tag ?= 1.0.1
image := go-executor:$(tag)
frontend_dir?=./frontend
backend_dir?=./backend

build:
	cd ${frontend_dir} && npm run build && cd -
	cp -r ${frontend_dir}/build ${backend_dir}
	cd ${backend_dir} && go build -o ./bin/go-executor

build-image:
	echo "current working directory: $$PWD"
	docker build . -t $(image)