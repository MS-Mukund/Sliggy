FROM node:17.3.1-buster
# NOTE: node:16.14.0 is throwing an error

# working directory is /backend for backend
WORKDIR /usr/app

# copy the local package.json to container 
COPY package.json package.json
COPY package-lock.json package-lock.json

# run executes a process inside the container
RUN npm install nodemon@2.0.12 -g
RUN npm install

# copy source code - local to container
COPY . .

## //
# EXPOSE 4000

# cmd specifies the instruction that has to run when container starts. Can be overriden by docker run. 
CMD ["npm", "run", "dev"]

# build the image
# docker build -t sliggy-back-docker:1.0.0-dev .
# docker run --rm -it --name sliggyf -p 3000:3000 sliggy-front-docker:0.1.0-dev
# docker exec -it sliggyf bash
