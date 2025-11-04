# Stage 1: Build stage
FROM node:14.21.3 AS builder

WORKDIR /app

# Copy package files and yarn.lock
COPY package*.json yarn.lock ./

# Install all dependencies (skip postinstall)
RUN yarn install --ignore-scripts

# Build bcrypt native module
RUN npm rebuild bcrypt --build-from-source

# Copy source files
COPY . .

# Build TypeScript
RUN yarn build

# Stage 2: Production stage
FROM node:14.21.3

WORKDIR /app

# Copy package files
COPY package*.json yarn.lock ./

# Install production dependencies (skip postinstall)
RUN yarn install --production --ignore-scripts

# Copy built bcrypt module from builder stage (already compiled)
COPY --from=builder /app/node_modules/bcrypt ./node_modules/bcrypt

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/ormconfig.js ./ormconfig.js

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]

