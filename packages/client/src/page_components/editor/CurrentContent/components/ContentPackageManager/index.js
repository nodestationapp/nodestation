import "./styles.scss";

import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Table from "components/Table";
import Button from "components/Button";
import Loader from "components/Loader";
import Input from "components/form/Input";
import IconButton from "components/IconButton";
import EditorContentLayout from "components/layouts/EditorContentLayout";

import api from "libs/api";

import { useEditor } from "context/client/editor";
import { useOrganization } from "context/organization";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { LockClosedIcon, TrashIcon } from "@heroicons/react/24/outline";

const mainClass = "package-manager-content";

let timer;

const ContentPackageManager = ({ data }) => {
  const { editor_history_loading } = useEditor();
  const { setMinimizeHandler } = useOrganization();

  const [search, setSearch] = useState("");
  const [search_result, setSearchResult] = useState(null);
  const [search_loading, setSearchLoading] = useState(false);
  const [install_loading, setInstallLoading] = useState(null);

  const {
    isLoading: packages_loading,
    data: packages,
    refetch: packagesRefetch,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: () => api.get("/packages"),
  });

  useEffect(() => {
    if (!!!data) return;
    setMinimizeHandler(data?.id);
    // eslint-disable-next-line
  }, [data]);

  const handleSearch = async (value) => {
    if (!!!value) {
      setSearchResult(null);
      setSearch(value);
      return;
    }

    clearTimeout(timer);
    setSearch(value);

    timer = setTimeout(async () => {
      setSearchLoading(true);
      const result = await api.get(`/packages/search?q=${value}`);

      setSearchResult(result);
      setSearchLoading(false);
    }, 500);
  };

  const onPackageAction = async (name, version, type) => {
    try {
      setInstallLoading(name);
      if (type === "install") {
        await window.api.server.action({ type: "install", name, version });
      } else {
        await window.api.server.action({ type: "uninstall", name, version });
      }
      packagesRefetch();
    } catch (err) {
      console.error(err);
    }

    setInstallLoading(null);
  };

  const fields = [
    {
      key: "name",
      value: "Name",
    },
    {
      key: "version",
      value: "Version",
    },
    {
      key: "created_at",
      value: "Installed at",
    },
  ];

  const data_to_show = search_result || packages;

  const table_data = {
    keys: [...fields],
    items: data_to_show?.map((item) => {
      const installed_package = packages.find(
        (element) => element.name === item?.name
      );
      const is_installing = item?.name === install_loading;

      return {
        onclick: !!is_installing
          ? null
          : installed_package?.type === "system"
            ? null
            : () => {},
        actions: !!!is_installing && (
          <>
            {!!installed_package ? (
              <IconButton
                disabled={is_installing}
                icon={<TrashIcon color="#FF3636" />}
                onClick={() =>
                  onPackageAction(item?.name, item?.version, "uninstall")
                }
              />
            ) : (
              <Button
                size="small"
                loading={is_installing}
                onClick={() =>
                  onPackageAction(item?.name, item?.version, "install")
                }
              >
                Install
              </Button>
            )}
          </>
        ),
        data: [
          {
            key: "name",
            value: (
              <>
                {is_installing && <Loader />}
                {!!installed_package &&
                  !!!is_installing &&
                  (installed_package?.type === "system" ? (
                    <LockClosedIcon height={18} width={18} />
                  ) : (
                    <CheckCircleIcon height={18} width={18} />
                  ))}
                {item?.name}
              </>
            ),
          },
          {
            key: "version",
            value: item?.version,
          },
          {
            key: "created_at",
            value: !!installed_package?.created_at
              ? moment?.unix(installed_package?.created_at)?.format("lll")
              : "-",
          },
        ],
      };
    }),
  };

  return (
    <EditorContentLayout loading={editor_history_loading}>
      <div className={mainClass}>
        <div className={`${mainClass}__search`}>
          <Input
            name="search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search package"
            variant="light"
          />
        </div>
        <div className={`${mainClass}__results`}>
          <h3>
            {!!search_result ? (
              <>
                Results for <strong>{search}</strong>
              </>
            ) : (
              "Installed packages"
            )}
          </h3>
          <Table
            data={table_data}
            loading={packages_loading || search_loading}
          />
        </div>
      </div>
    </EditorContentLayout>
  );
};

export default ContentPackageManager;
