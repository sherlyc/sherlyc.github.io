#!/usr/bin/env bash
export URL="http://localhost:8888/"
GCR="gcr.io/shared-218200/nz.stuff/experience/experience-frontend"
CURRENT_PROD_VERSION=450

cd pwa-cache-test/ && npm i && cd ..

for (( i=450; i<=CURRENT_PROD_VERSION; i++ )); do
    export VERSION="1.${i}"
    echo "Running test on version ${VERSION}"

    export DOCKER_IMAGE="${GCR}:${VERSION}"

    docker pull $DOCKER_IMAGE
    (docker-compose -f ./pwa-cache-test/docker-compose.yaml up) & (cd pwa-cache-test/ && sleep 10 && npm run test && cd ..)
    docker-compose -f ./pwa-cache-test/docker-compose.yaml down

    echo "Successfully completed test for ${VERSION}"
    echo $(( CURRENT_PROD_VERSION - i )) "versions left to run"
    printf "\n\n\n\n"
done

