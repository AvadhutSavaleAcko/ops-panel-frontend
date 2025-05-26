# syntax=docker/dockerfile:experimental

# Use node:18 as the base image for building the app
FROM node:18 AS build

# Set build-time variables
ARG GIT_HEAD="HEAD"
#TODO: remove hard code bucket
ARG FRONTEND_S3_BUCKET   
ARG DEFAULT_REGION="ap-south-1"

# Set environment variables
ENV AWS_DEFAULT_REGION=${DEFAULT_REGION}

# Update and install awscli
RUN apt update && \
    apt install awscli -y

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists) first to leverage Docker cache
# COPY package.json package-lock.json* ./


# Copy all files to the working directory
COPY . ./

# Clean up any previous builds and node modules
RUN rm -rf /usr/src/app/node_modules \
    /usr/src/app/.next \
    /usr/src/app/dist

# Install dependencies and build the project
RUN npm run build

# Prepare for S3 sync
RUN mkdir ${GIT_HEAD} && \
    cd ${GIT_HEAD} && \
    mkdir _next && \
    cp -R ../.next/static ./_next && \
    cd ..

# Sync static files to S3
RUN aws s3 sync ./public s3://${FRONTEND_S3_BUCKET}/ --cache-control 'max-age=31536000'

# Upload build assets to S3
RUN aws s3 cp --recursive ./${GIT_HEAD} s3://${FRONTEND_S3_BUCKET}/next_assets/${GIT_HEAD} --cache-control 'max-age=31536000'

# Remove node_modules to install production dependencies
RUN rm -rf /usr/src/app/node_modules && npm install --legacy-peer-deps --production

# Use node:18-alpine for the final image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy necessary files and directories from the build stage
COPY --from=build /usr/src/app/.next/ /usr/src/app/.next/
COPY --from=build /usr/src/app/public/ /usr/src/app/public/
COPY --from=build /usr/src/app/node_modules/ /usr/src/app/node_modules/
COPY --from=build /usr/src/app/package.json /usr/src/app/
COPY --from=build /usr/src/app/next.config.mjs /usr/src/app/
COPY --from=build /usr/src/app/.env /usr/src/app/

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]