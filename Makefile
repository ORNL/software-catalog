clean:
	rm -rf _site/
	rm -rf .jekyll-cache/
	rm -f .jekyll-metadata

build:
	bundle exec jekyll build

run:
	bundle exec jekyll serve --incremental

test:
	flake8
	black --check .
