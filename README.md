# GrapesJS Development storagemanager for local file system


Under development DO NOT USE

Modify webpack-dev-server so that it can load/save files

https://webpack.js.org/configuration/dev-server/

https://webpack.js.org/guides/development/
use webpack-dev-middleware

and express

GrapesJS storage wrapper for local system. Probably only useful for development. Read and write grapesjs data files to local filesystem.

Requires GrapesJS v0.14.15 or higher

Based on artf/grapesjs-firestore

## Summary

Plugin name: `grapesjs-dev-filestore`

Creates data files
- `.html`
- `.css`
- `.traits`

## Options

|Option|Description|Default|
|-|-|-
| `directory` | Directory to store files (String) | `"data"` |
| `baseFileName` | Base file name for files (String) | `"grapesjs"` |


## Download


* NPM
  * `npm i grapesjs-dev-filestore`
* GIT
  * `git clone https://github.com/johnlobster/grapesjs-dev-filestore`

## Usage



```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-dev-filestore.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      ...
      storageManager: { type: 'dev-filestore' },
      plugins: ['grapesjs-dev-filestore'],
      pluginsOpts: {
        'grapesjs-dev-filestore': {
          directory: "grapesjs-data",
          baseFileName: "test1"
        }
      }
  });
</script>
```

## Development

Clone the repository

```sh
$ git clone https://github.com/johnlobster/grapesjs-dev-filestore.git
$ cd grapesjs-dev-filestore
```

Install dependencies

```sh
$ npm i
```

The plugin relies on GrapesJS via `peerDependencies` so you have to install it manually (without adding it to package.json)

```sh
$ npm i grapesjs --no-save
```

Start the dev server

```sh
$ npm start
```





## License

BSD 3-Clause
