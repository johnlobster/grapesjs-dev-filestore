import grapesjs from 'grapesjs';
import fs from "fs";

// Saving as files so doesn't need to be serialized. Instead of altering the editor or storageManger
// deserialize before saving files, one file for each key in data
// checks to see if directory exists and creates it if necessary before defining load and save
export default grapesjs.plugins.add('grapesjs-dev-filestore', (editor, opts = {}) => {
  const options = { ...{
    directory: "grapesjs-data",
    baseFileName: "grapesjs"
  },  ...opts };

  const sm = editor.StorageManager;
  const storageName = 'dev-filestore';
  const onError = err => sm.onError(storageName, err.code || err);

  // check to see if directory exists, only need to run this on initialization
  ( () => {
    if (!fs.existsSync(directory)) {
      console.log("Create new directory " + directory);
      fs.mkdirSync(directory);
    }
  })()

  sm.add(storageName, {

    load(keys, clb, clbError) {
      let filename = `${directory}/${baseFileName}-all.json`

      fs.loadFile(filename, (err,data) => {
        if (err) {
          console.log("Error reading file " + filename);
          clbError();
        } else {
          clb(data);
        }
      })
    },

    //   const result = {};

    //   keys.forEach(key => {
    //     const value = SimpleStorage[key];
    //     if (value) {
    //       result[key] = value;
    //     }
    //   });

    //   // Might be called inside some async method
    //   clb(result);

    store(data, clb, clbError) {
      for (let key in data) {
        let filename = `${directory}/${baseFileName}-all.json`
        fs.writeFile(filename, data, "utf-8", (err) => {
          if ( err ) {
            console.log("Error writing file " + filename);
            clbError();
          } else {
            console.log("Saved " + filename);
            clb();
          }
          
        });
      }
      // for (let key in data) {
      //   let filename = `${directory}/${baseFileName}-${key}.json`
      //   fs.writeFile(filename, data, "utf-8", (err) => {
      //     if (err) {
      //       console.log("Error writing file " + filename);
      //       clbError();
      //     } else {
      //       console.log("Saved " + filename);
      //       clb();
      //     }

      //   });
      }
    
  });
});
