FROM golang:alpine AS build

RUN apk update && \
    apk add nodejs npm

COPY . /usr/src/yt-dlp-webui

WORKDIR /usr/src/yt-dlp-webui/frontend

RUN npm install
RUN npm run build

WORKDIR /usr/src/yt-dlp-webui
RUN CGO_ENABLED=0 GOOS=linux go build -o yt-dlp-webui

FROM alpine:edge

VOLUME /downloads /config

WORKDIR /app

RUN apk update && \
    apk add psmisc ffmpeg yt-dlp --no-cache

COPY --from=build /usr/src/yt-dlp-webui/yt-dlp-webui /app

COPY config.yml /config/config.yml

ENV JWT_SECRET=secret

EXPOSE 3033
ENTRYPOINT [ "./yt-dlp-webui" , "--out", "/downloads", "--conf", "/config/config.yml", "--db", "/config/local.db" ]
