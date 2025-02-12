all:
	rm *~
	cat README.md | md-to-pdf > BrightSign-coding-test.pdf


install-tools:
	npm i -g md-to-pdf


