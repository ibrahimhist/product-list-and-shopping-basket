### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10-alpine as builder

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Linux setup
RUN apk update \
  && apk add --update alpine-sdk \
  && apk del alpine-sdk \
  && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
  && npm cache verify \
  && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd \
  && apk add --no-cache bash git openssh


# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . .


# Set global node variable to avoid JS stacktrace error
ENV NODE_OPTIONS=--max_old_space_size=4096

RUN git config --global http.sslVerify false

# Build the project
RUN npm run ng build -- --prod --output-path=dist  

### STAGE 2: Setup ###

FROM nginx:1.18.0-alpine


## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy dist content to html nginx folder, config nginx to point in index.html
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf


## Contiune with nginx
CMD  ["nginx", "-g", "daemon off;"]
