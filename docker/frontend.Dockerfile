FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy application
COPY frontend/ .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
