import "./styles.scss";

import { NavLink } from "react-router-dom";

import LoggedUser from "../LoggedUser";
import IconButton from "components/IconButton";

import { useApp } from "context/app";
import { useOrganization } from "context/organization";

import {
  PlusIcon,
  PhotoIcon,
  UsersIcon,
  AtSymbolIcon,
  CircleStackIcon,
  ChevronRightIcon,
  PaperAirplaneIcon,
  Square3Stack3DIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";

const mainClass = "dashboard-layout-sidebar";

const Menu = () => {
  const { forms_count } = useApp();
  const { tables = [], setAddTableModal, preferences } = useOrganization();

  const auth_preferences = preferences?.find(
    (item) => item?.table_id === "nodestation_users"
  );

  const menu_items = [
    {
      icon: <PresentationChartBarIcon />,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: <Square3Stack3DIcon />,
      label: "Endpoints",
      href: "/endpoints",
    },
    {
      icon: <PaperAirplaneIcon />,
      label: "Forms",
      href: "/forms",
      count: forms_count,
    },
    {
      icon: <PhotoIcon />,
      label: "Media",
      href: "/media",
    },
    {
      icon: <UsersIcon />,
      label: "Authentication",
      href: `/authentication?v=${auth_preferences?.id}`,
    },
    {
      icon: <AtSymbolIcon />,
      label: "Emails",
      href: "/emails",
    },
  ];

  const tables_menu_items = [
    ...tables?.map((item) => {
      const table_preference =
        preferences?.find(
          (element) => element?.table_id === item?.id && !!element?.last_viewed
        )?.id ||
        preferences?.find((element) => element?.table_id === item?.id)?.id;

      return {
        icon: <CircleStackIcon />,
        label: item?.name,
        href: `/tables/${item?.id}?v=${table_preference}`,
      };
    }),
  ];

  return (
    <div className={`${mainClass}__menu__container`}>
      <div className={`${mainClass}__menu`}>
        <div className={`${mainClass}__menu__items`}>
          {menu_items?.map(({ icon, label, href, count, external }, index) => (
            <NavLink
              key={index}
              to={href}
              className={({ isActive }) =>
                isActive
                  ? `${mainClass}__menu__items__item ${mainClass}__menu__items__item--active`
                  : `${mainClass}__menu__items__item`
              }
            >
              <span>
                {icon}
                {label}
              </span>
              {!!external && (
                <div className={`${mainClass}__menu__items__item__external`}>
                  {!!external && <ChevronRightIcon />}
                </div>
              )}
              {!!parseInt(count) && <small>{count}</small>}
            </NavLink>
          ))}
        </div>

        <div className={`${mainClass}__menu__items`}>
          <div className={`${mainClass}__menu__items__header`}>
            <span>Tables</span>
            <IconButton
              onClick={() => setAddTableModal("tables")}
              size="small"
              icon={<PlusIcon />}
            />
          </div>
          {tables_menu_items?.map(({ icon, label, href }, index) => (
            <NavLink
              key={index}
              to={href}
              className={({ isActive }) =>
                isActive
                  ? `${mainClass}__menu__items__item ${mainClass}__menu__items__item--active`
                  : `${mainClass}__menu__items__item`
              }
            >
              <span>
                {icon}
                {label}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className={`${mainClass}__menu__bottom`}>
        <LoggedUser />
      </div>
    </div>
  );
};

export default Menu;
