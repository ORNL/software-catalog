# Docker image for the python scripts included in "_explore"
FROM python:3.8-slim

WORKDIR /app
# test specific requirements
RUN pip3 install flake8 black
# copy what we need for dependencies
COPY _explore/scripts/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt && rm requirements.txt
# You will want to mount the entire repository as a volume during runtime
