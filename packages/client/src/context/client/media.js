import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";
import api from "libs/api";

const MediaContext = createContext();

const MediaProvider = ({ children }) => {
  const [percent, setPercent] = useState([]);
  const [uploading_files, setUploadingFiles] = useState([]);

  const {
    isLoading: loading,
    data: media,
    refetch: refetchMedia,
  } = useQuery({
    queryKey: ["media"],
    queryFn: () => api.get("/media"),
  });

  const {
    isLoading: settings_loading,
    data: media_settings,
    refetch: refetchMediaSettings,
  } = useQuery({
    queryKey: ["media_settings"],
    queryFn: () => api.get("/media/settings"),
  });

  const uploadFiles = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        values?.forEach((item, index) => {
          const formData = new FormData();
          formData.append("files", item);

          api
            .post(`/media`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
              onUploadProgress: ({ loaded, total }) => {
                setPercent((prev) => {
                  let temp = [...prev];
                  const formatted_percent = Math.floor((loaded * 100) / total);

                  temp[index] = formatted_percent;

                  return temp;
                });
              },
            })
            .then(() => {
              refetchMedia();
            });
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateMediaSettings = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/media/settings`, { ...values });

        refetchMediaSettings();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const value = useMemo(() => {
    return {
      media,
      loading,
      uploadFiles,
      percent,
      media_settings,
      settings_loading,
      uploading_files,
      setUploadingFiles,
      updateMediaSettings,
    };
    // eslint-disable-next-line
  }, [
    media,
    loading,
    percent,
    media_settings,
    uploading_files,
    settings_loading,
  ]);

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};

const useMedia = () => useContext(MediaContext);
export { MediaContext, useMedia };
export default MediaProvider;
