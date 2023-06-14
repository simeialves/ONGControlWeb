export function saveAsExcelFile(buffer, fileName) {
  const data = new Blob([buffer], { type: "application/octet-stream" });
  const url = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
