# Elastic Search Demo - Backend

### Installation

The demo requires [Node.js](https://nodejs.org/), [elasticsearch](https://www.elastic.co/downloads/elasticsearch) to run.

Install the dependencies and start the server.

```sh
$ brew tap caskroom/cask
$ brew install brew-cask
$ brew cask install java
$ brew install elasticsearch
$ elasticsearch
```

Note : If the above method for installing elasticsearch does not work, download the executable for your operating system at this [link](https://www.elastic.co/downloads/elasticsearch) and follow the instructions.

```sh
$ git clone https://github.com/anjanragh/elasticsearch-demo.git
$ cd elasticsearch-demo/
$ npm i
$ node lib/load_data.js
$ node .
```

You can browse the search and suggest endpoints on [http://localhost:3000/explorer/](http://localhost:3000/explorer/)
