FROM node:17.3.1-buster 
# as build
# NOTE: node:16.14.0 is throwing an error

# working directory is /usr/app for fronted 
WORKDIR /usr/app

# copy the local package.json to container 
COPY package.json package.json
COPY package-lock.json package-lock.json

# run executes a process inside the container
RUN npm install

COPY . .

CMD ["npm", "run", "start"]