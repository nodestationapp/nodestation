import "./styles.scss";

import classnames from "classnames";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";

import IconButton from "components/IconButton";
import DropdownInput from "components/form/DropdownInput";

import api from "libs/api";

import { PlusIcon } from "@heroicons/react/24/outline";

const mainClass = "table__toolbar__menu";

const Submenu = ({ data, tableId, view, customizableView }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pathname, search } = useLocation();

  const currentPathname = pathname + search;

  const onAddView = async (name) => {
    try {
      const create = await api.post("/preferences/create", {
        name,
        table: tableId,
        view,
      });

      navigate(`${pathname}?v=${create?.id}`);

      queryClient.refetchQueries("tables");
    } catch (err) {
      console.error(err);
    }
  };

  const onUpdateView = async (name) => {
    try {
      await api.put(`/preferences/${view}`, {
        name,
      });

      queryClient.refetchQueries("tables");
    } catch (err) {
      console.error(err);
    }
  };

  const onDeleteView = async () => {
    try {
      await api.delete(`/preferences/${view}`);

      queryClient.refetchQueries("tables");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={mainClass}>
      {data?.map(({ label, href, icon, variant }, index) => {
        const active = currentPathname === href || variant === "label";
        const Component = href ? Link : "span";

        return (
          <DropdownInput
            placeholder="View name"
            position="right"
            value={label}
            onChange={(e) => onUpdateView(e?.target?.value)}
            onDelete={onDeleteView}
            preventSelectOpen={!!!active || !!!customizableView}
            CustomButton={() => (
              <Component
                to={href}
                key={index}
                className={classnames(`${mainClass}__item`, {
                  [`${mainClass}__item--active`]: active,
                })}
              >
                {label}
                {icon}
              </Component>
            )}
          />
        );
      })}
      {!!customizableView && (
        <>
          {!!onAddView && (
            <DropdownInput
              placeholder="View name"
              position="right"
              onChange={(e) => onAddView(e?.target?.value)}
              CustomButton={({ active }) => (
                <IconButton active={active} size="small" icon={<PlusIcon />} />
              )}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Submenu;
