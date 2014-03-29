FROM d.ccll.im/meteor:0.8.0

# Install git
RUN apt-get update
RUN apt-get install -y git

# Add code folder
ADD . /home/dev/simple-blog

# Exposed
EXPOSE 3000
VOLUME /home/dev/simple-blog

