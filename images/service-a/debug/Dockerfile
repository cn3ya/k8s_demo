FROM cn3ya/k8s_demo:service-a_latest
WORKDIR /debug
COPY ./entry.sh /entry.sh
RUN apk --no-cache add python make g++ bash \
&& wget https://github.com/cn3ya/container_web_console/archive/master.zip \
&& unzip master.zip \
&& cd container_web_console-master \
&& npm install \
&& chmod +x /entry.sh
EXPOSE 3000 2222
ENTRYPOINT  ["/entry.sh"]