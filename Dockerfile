# ==========================================
# Stage 1: Build Frontend (Vite + React + Tailwind)
# ==========================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# ==========================================
# Stage 2: Build Backend (Spring Boot 4 / Java 21)
# ==========================================
FROM eclipse-temurin:21-jdk-alpine AS backend-builder
WORKDIR /app

RUN apk add --no-cache bash

# Copy Gradle files for dependency caching
COPY gradlew ./
COPY gradle/ gradle/
COPY build.gradle settings.gradle ./

RUN chmod +x ./gradlew

# Pre-fetch Gradle dependencies
RUN ./gradlew dependencies --no-daemon || true

# Copy source code
COPY src/ src/

# Copy built frontend assets directly into Spring Boot static resources
COPY --from=frontend-builder /app/frontend/dist/ src/main/resources/static/

# Build standalone Spring Boot bootJar
RUN ./gradlew bootJar --no-daemon -x test

# ==========================================
# Stage 3: Minimal Production Runtime
# ==========================================
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

# Add curl for container healthcheck & configure non-root user
RUN apk add --no-cache curl tzdata \
    && addgroup -S appgroup \
    && adduser -S appuser -G appgroup

ENV TZ=Asia/Jakarta

# Copy executable jar from backend-builder
COPY --from=backend-builder --chown=appuser:appgroup /app/build/libs/*.jar app.jar

USER appuser:appgroup

EXPOSE 8020

HEALTHCHECK --interval=20s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:8020/ || exit 1

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
