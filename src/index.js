import grapesjs from 'grapesjs';

export default grapesjs.plugins.add('remote-test', (editor, opts = {}) => {
  const options = { ...{
    fileBaseName: "grapesjs",
    splitFiles: 1

  },  ...opts };

  const sm = editor.StorageManager;
  const storageName = 'remote-test';

  const getAsyncDoc = (clb) => {
    getAsyncCollection(cll => {
      doc = cll.doc(getDocId());
      clb(doc);
    });
  };

  sm.add(storageName, {
    getDoc,

    getDocId,

    setDocId(id) {
      docId = id;
    },

    load(keys, clb, clbError) {
      getAsyncDoc(doc => {
        doc.get()
        .then(doc => doc.exists && clb(doc.data()))
        .catch(clbError);
      });
    },

    store(data, clb, clbError) {
      getAsyncDoc(doc => {
        doc.set(data)
        .then(clb)
        .catch(clbError);
      });
    }
  });
});
