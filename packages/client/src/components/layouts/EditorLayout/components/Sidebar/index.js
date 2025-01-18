import "./styles.scss";

import classnames from "classnames";

import Menu from "./components/Menu";
import Button from "components/Button";

import { useApp } from "context/app";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const mainClass = "editor-layout-sidebar";

const Sidebar = () => {
  const { mobile_sidebar_open, setMobileSidebarOpen } = useApp();

  return (
    <>
      <div
        className={classnames(mainClass, {
          [`${mainClass}--mobile-open`]: !!mobile_sidebar_open,
        })}
      >
        <div className={`${mainClass}__header`}>
          <Button
            href="/"
            variant="no-border"
            icon={<ChevronLeftIcon />}
            fullWidth
          >
            Editor
          </Button>
        </div>
        <Menu setMobileSidebarOpen={setMobileSidebarOpen} />
      </div>
      <div
        className={classnames(`${mainClass}__mobile-backdrop`, {
          [`${mainClass}__mobile-backdrop--mobile-open`]: !!mobile_sidebar_open,
        })}
        onClick={() => setMobileSidebarOpen(false)}
      ></div>
    </>
  );
};

export default Sidebar;
