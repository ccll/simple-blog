#!/bin/sh
docker run -i -t -p 3000:3000 -v $PWD:/home/dev/simple-blog --name blog-dev blog /sbin/my_init -- /bin/bash
