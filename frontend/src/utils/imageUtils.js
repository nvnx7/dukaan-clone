export function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    if (!file) resolve(null);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Error reading file!"));
    };

    reader.readAsDataURL(file);
  });
}
