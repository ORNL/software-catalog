clean:
	bundle exec jekyll clean

build:
	bundle exec jekyll build

run:
	bundle exec jekyll serve --incremental

test:
	flake8
	black --check .
