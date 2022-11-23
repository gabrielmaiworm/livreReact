const getUploadParams = ({ meta }) => {
  const url = "http://localhost:3005/images";
  return { url, meta: { image: `${url}/${encodeURIComponent(meta.name)}` } };
};
export default getUploadParams;