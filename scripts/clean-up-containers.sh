#!/usr/bin/env bash
echo "Clean up containers if exists"

OLD_CONTAINER_IDS="$(docker ps --all --quiet --filter "name=yokohama_yokohama-autocannon-*" --filter "name=experience_experience-frontend-*")"
if [[ -n "$OLD_CONTAINER_IDS" ]]; then
  docker stop ${OLD_CONTAINER_IDS} && docker rm ${OLD_CONTAINER_IDS}
fi
