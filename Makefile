default:
	CGO_ENABLED=0 go build -o yt-dlp-webui main.go

all:
	cd frontend && pnpm build && cd ..
	CGO_ENABLED=0 go build -o yt-dlp-webui main.go

multiarch:
	mkdir -p build
	CGO_ENABLED=0 GOOS=linux GOARCH=arm go build -o build/yt-dlp-webui_linux-arm main.go
	CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build -o build/yt-dlp-webui_linux-arm64 main.go
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o build/yt-dlp-webui_linux-amd64 main.go

clean:
	rm -rf build