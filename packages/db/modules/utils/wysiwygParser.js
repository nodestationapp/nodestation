import edjsHTML from "editorjs-html";

const edjsParser = edjsHTML();

const wysiwygParser = (fields, objects) => {
  for (const field of fields) {
    if (field?.type === "wysiwyg") {
      for (const object of objects) {
        let value = object?.[field?.slug];

        const html = value ? edjsParser.parse(value) : "";

        object[field?.slug] = html;
      }
    }
  }

  return objects;
};

export default wysiwygParser;
