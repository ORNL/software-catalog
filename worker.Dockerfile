# Docker image for the python scripts included in "_explore"
FROM python:3.8-slim

WORKDIR /app
# We need to copy every file, because the worker scripts will output JSON files in several locations
COPY . .
RUN pip3 install -r _explore/scripts/requirements.txt
# test specific requirements
RUN pip3 install flake8 black
