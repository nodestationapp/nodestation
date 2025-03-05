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
  const { tables = [], setAddTableModal } = useOrganization();

  const menu_items = [
    {
      icon: <PresentationChartBarIcon />,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: <Square3Stack3DIcon />,
      label: "Editor",
      href: "/editor",
      external: true,
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
      href: "/authentication",
    },
    {
      icon: <AtSymbolIcon />,
      label: "Emails",
      href: "/emails",
    },
  ];

  const tables_menu_items = [
    ...tables?.map((item) => ({
      icon: <CircleStackIcon />,
      label: item?.name,
      href: `/tables/${item?.id}?v=${item?.view}`,
    })),
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
              onClick={() => setAddTableModal("tbl")}
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
