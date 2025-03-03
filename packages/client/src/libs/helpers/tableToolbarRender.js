import { TrashIcon } from "@heroicons/react/24/outline";
import { useOrganization } from "context/organization";

const TableToolbarRender = (
  id,
  type,
  formatted_fields,
  setContentEditor,
  setArchiveEntryModal
) => {
  const { add_table_modal, setAddTableModal } = useOrganization();

  const new_entry_schema = formatted_fields?.reduce((obj, item) => {
    obj[item.slug] = null;
    return obj;
  }, {});

  switch (type) {
    case "authentication":
      return {
        menu: [
          {
            label: "Entries",
            href: `/authentication`,
          },
        ],
        selectAction: [
          {
            icon: <TrashIcon color="#FF3636" />,
            onClick: () => setArchiveEntryModal(true),
          },
        ],
        settingsButtonHandler: `/authentication/settings`,
        newButtonHandler: () => setContentEditor(new_entry_schema),
      };
    case "forms":
      return {
        menu: [
          {
            label: "Entries",
            href: `/forms/${id}`,
          },
        ],
        selectAction: [
          {
            icon: <TrashIcon color="#FF3636" />,
            onClick: () => setArchiveEntryModal(true),
          },
        ],
        settingsButtonHandler: `/forms/${id}/settings`,
        // newButtonHandler: () => setAddTableModal(true),
      };
    default:
      return {
        menu: [
          {
            label: "Entries",
            href: `/tables/${id}`,
          },
        ],
        selectAction: [
          {
            icon: <TrashIcon color="#FF3636" />,
            onClick: () => setArchiveEntryModal(true),
          },
        ],
        settingsButtonHandler: `/tables/${id}/settings`,
        newButtonHandler: () => setContentEditor(new_entry_schema),
      };
  }
};

export default TableToolbarRender;
