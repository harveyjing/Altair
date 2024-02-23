const saveToIndexedDB = (code, output) => {
  const request = window.indexedDB.open("CodeDB", 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.x;
    const objectStore = db.createObjectStore("codes", {
      keyPath: "id",
      autoIncrement: true,
    });
    objectStore.createIndex("code", "code", { unique: false });
    objectStore.createIndex("output", "output", { unique: false });
    objectStore.createIndex("timestamp", "timestamp", { unique: false });
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction("codes", "readwrite");
    const objectStore = transaction.objectStore("codes");
    const timestamp = new Date().toLocaleString();

    objectStore.add({ code, output, timestamp });
  };

  request.onerror = (event) => {
    console.error("Error saving to IndexedDB:", event.target.error);
  };
};

// Load code from IndexedDB
const loadFromIndexedDB = (setExecutionList) => {
  const request = window.indexedDB.open("CodeDB", 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction("codes", "readonly");
    const objectStore = transaction.objectStore("codes");
    const codes = [];

    objectStore.openCursor().onsuccess = (cursorEvent) => {
      const cursor = cursorEvent.target.result;
      if (cursor) {
        codes.push({
          id: cursor.value.id,
          code: cursor.value.code,
          output: cursor.value.output,
          timestamp: cursor.value.timestamp,
        });
        cursor.continue();
      } else {
        // Set the loaded codes in the state
        setExecutionList(codes);
      }
    };
  };

  request.onerror = (event) => {
    console.error("Error loading from IndexedDB:", event.target.error);
  };
};
