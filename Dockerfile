FROM node:14-alpine

WORKDIR /usr/src/app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install --only=production

# 소스 코드 복사
COPY . .

EXPOSE 3000

CMD ["node", "app.js"]




