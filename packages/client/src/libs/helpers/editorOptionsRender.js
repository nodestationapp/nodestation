import CronOptions from "page_components/editor/CurrentContent/components/ContentEditor/components/CronOptions";
import EndpointOptions from "page_components/editor/CurrentContent/components/ContentEditor/components/EndpointOptions";

const options_render = (type) => {
  switch (type) {
    case "ep":
      return <EndpointOptions />;
    case "cron":
      return <CronOptions />;
    case "fn":
      return null;
    case "mid":
      return null;
    default:
      return "";
  }
};

const editorOptionsRender = (type) => {
  return options_render(type);
};

export default editorOptionsRender;
