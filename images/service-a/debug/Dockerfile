FROM cn3ya/k8s_demo:service-a_latest
WORKDIR /debug
RUN apk --no-cache add python make g++ bash \
&& wget https://github.com/cn3ya/container_web_console/archive/master.zip \
&& unzip master.zip \
&& cd container_web_console-master \
&& npm install
COPY ./entry.sh /entry.sh
EXPOSE 3000 2222
CMD ["sh /entry.sh"]