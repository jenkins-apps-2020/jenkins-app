FROM node:12.10.0-alpine
ENV ng2Version=NG2_VERSION
ENV buildNumber=BUILD_NUMBER
ENV branchName=BRANCH
##Add Chromium browser for UNIT test
#RUN apk add --no-cache chromium
#ENV CHROME_BIN=/usr/bin/chromium-browser
#RUN export CHROME_BIN=/usr/bin/chromium-browser
RUN apk add --no-cache curl
RUN apk add --no-cache unzip
COPY package*.json ./
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
#ADD ./.npmrc /root/.npmrc
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
##RUN npm run test:coverage
RUN npm run build
#
#RUN npm run copy
RUN npm run zipdist
