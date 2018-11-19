FROM cn3ya/k8s_demo:service-a_latest
WORKDIR /debug
RUN apk add --no-cache git \
&& wget https://github.com/cn3ya/container_web_console/archive/master.zip \
&& unzip master.zip -d . \
&& cd container_web_console-master \
&& npm install
EXPOSE 3000 2222
CMD ["cd /app","npm","start","&&","cd /debug/container_web_console-master","npm start"]