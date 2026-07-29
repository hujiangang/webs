export function stripDataUrlPrefix(value) {
  const commaIndex = value.indexOf(',');
  return commaIndex >= 0 ? value.slice(commaIndex + 1) : value;
}

export function readFileAsDataUrl(file, errorMessage = '文件读取失败') {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error(errorMessage));
    reader.readAsDataURL(file);
  });
}

export function blobToDataUrl(blob, errorMessage = '处理结果读取失败') {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error(errorMessage));
    reader.readAsDataURL(blob);
  });
}

export async function readResponseError(response, fallbackMessage = '请求处理失败') {
  const clonedResponse = response.clone();
  try {
    const data = await response.json();
    return data.detail || fallbackMessage;
  } catch (error) {
    const text = await clonedResponse.text();
    return text || fallbackMessage;
  }
}