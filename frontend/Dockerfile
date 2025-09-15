# Development stage
FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli@20
RUN npm ci

COPY . .

EXPOSE 4200

CMD ["npm", "start"]

# Production stage
# FROM node:20-alpine AS builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm install -g @angular/cli@20
# RUN npm ci

# COPY . .

# RUN ng build

# FROM nginx:alpine AS production

# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=builder /app/dist/collab-hub-frontend/browser /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]