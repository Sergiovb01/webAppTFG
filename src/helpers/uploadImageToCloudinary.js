

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'tfg-cloudinary'); // ← Reemplaza con el tuyo
  formData.append('folder', 'proyectos');

  const res = await fetch(`https://api.cloudinary.com/v1_1/dsbxxzlqn/image/upload`, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  return data.secure_url;
};
