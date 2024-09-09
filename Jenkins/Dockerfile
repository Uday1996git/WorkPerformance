FROM alpine:3.18
ENV K6_VERSION v0.46.0
WORKDIR /app
RUN apk add --no-cache wget docker-cli
RUN wget -q https://github.com/grafana/k6/releases/download/${K6_VERSION}/k6-v${K6_VERSION#v}-linux-amd64.tar.gz
RUN tar -xzf k6-v${K6_VERSION#v}-linux-amd64.tar.gz
RUN cp k6-v${K6_VERSION#v}-linux-amd64/k6 /app/k6
CMD ["/bin/sh"]