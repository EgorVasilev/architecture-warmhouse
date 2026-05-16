FROM python:3.14.4-slim

WORKDIR /usr/src/app

RUN pip install mkdocs mkdocs_puml==2.3.0 mkdocs-puml-file==1.0.3

COPY . .

RUN mkdocs build

EXPOSE 8000
CMD ["python", "-m", "http.server", "8000", "-d", "./site"]