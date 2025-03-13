import TitleInput from "components/TitleInput";

const title_render = (type) => {
  switch (type) {
    case "endpoints":
      return <TitleInput type="method" name="name" />;
    case "cron":
      return <TitleInput name="name" label="Name:" />;
    case "fn":
      return <TitleInput name="name" label="Name:" />;
    case "mid":
      return <TitleInput name="name" label="Name:" />;
    default:
      return null;
  }
};

const editorTitleInputRender = (type) => {
  return title_render(type);
};

export default editorTitleInputRender;
