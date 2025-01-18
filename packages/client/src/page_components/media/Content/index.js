import "./styles.scss";

import { useState } from "react";

import Button from "components/Button";
import MediaItem from "components/MediaItem";
import AddAssetsModal from "../components/AddAssetsModal";
import RemoveMediaModal from "../components/RemoveMediaModal";
import NoItemsFound from "components/List/components/NoItemsFound";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useMedia } from "context/client/media";

import { PhotoIcon, PlusIcon } from "@heroicons/react/24/outline";

const mainClass = "media-content";

const breadcrumps = [
  {
    icon: <PhotoIcon />,
    label: "Media",
  },
];

const submenu_data = [
  {
    label: "My uploads",
    href: "/media",
  },
  {
    label: "Settings",
    href: "/media/settings",
  },
];

const MediaContent = () => {
  const { media, loading } = useMedia();

  const [add_media_modal, setAddMediaModal] = useState(false);
  const [remove_media_modal, setRemoveMediaModal] = useState(false);

  return (
    <>
      <DashboardContentLayout
        loading={loading}
        breadcrumps={breadcrumps}
        action={
          <Button onClick={() => setAddMediaModal(true)} icon={<PlusIcon />}>
            Add media
          </Button>
        }
        submenu={submenu_data}
      >
        {media?.length === 0 ? (
          <NoItemsFound />
        ) : (
          <div className={mainClass}>
            <div className={`${mainClass}__items`}>
              {media?.map((item, index) => (
                <MediaItem
                  key={index}
                  {...item}
                  url={item?.url}
                  onRemove={() =>
                    setRemoveMediaModal({ id: item?.id, name: item?.name })
                  }
                />
              ))}
            </div>
          </div>
        )}
      </DashboardContentLayout>
      {!!add_media_modal && (
        <AddAssetsModal onClose={() => setAddMediaModal(false)} />
      )}
      {!!remove_media_modal && (
        <RemoveMediaModal
          data={remove_media_modal}
          onClose={() => setRemoveMediaModal(false)}
        />
      )}
    </>
  );
};

export default MediaContent;
