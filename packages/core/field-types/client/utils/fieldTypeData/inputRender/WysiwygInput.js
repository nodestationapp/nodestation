import Header from "@editorjs/header";
import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef } from "react";

const WysiwygInput = ({ data, formik, type }) => {
  const editorRef = useRef(null);

  const value = formik.values[data?.slug];

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        placeholder: data?.name,
        data: value,
        async onChange(api) {
          const block = await api.saver.save();
          formik?.setFieldValue(data?.slug, block);
        },
        tools: {
          header: {
            class: Header,
            config: {
              levels: [1, 2, 3],
              defaultLevel: 2,
            },
          },
        },
      });
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div id="editorjs" style={{ border: "1px solid #ccc", padding: 10 }} />
  );
};

export default WysiwygInput;
