FROM node:latest
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY ./Backend/package.json .
RUN npm install
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 8081
CMD [ "npm", "run", "test" ]