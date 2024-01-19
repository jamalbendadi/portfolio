FROM node:18-alpine AS dev

ENV DIRECTUS_URL_CLIENT http://host.docker.internal:8055
ENV DIRECTUS_URL_SERVER http://host.docker.internal:8055

RUN apk --no-cache add python3 build-base && \
  	ln -sf /usr/bin/python3 /usr/bin/python

WORKDIR /app

COPY . .
RUN yarn install --frozen-lockfile



EXPOSE 3000

# CMD ["yarn", "dev"]

# docker run command
# docker run -it -p 3000:3000 -v ${PWD}:/app -v /app/node_modules --name pf pf_bis
