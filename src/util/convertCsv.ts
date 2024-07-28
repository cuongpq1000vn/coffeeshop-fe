export const convertToCSV = (data: any) => {
  if (!data.length) return "";

  const escapeCSVValue = (value: any) => {
    if (
      typeof value === "string" &&
      (value.includes(",") || value.includes('"') || value.includes("\n"))
    ) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  const header = Object.keys(data[0]).map(escapeCSVValue).join(",");
  const rows = data.map((row: any) => {
    return Object.values(row).map(escapeCSVValue).join(",");
  });

  return [header, ...rows].join("\n");
};

export const downloadCSV = (data: any, filename: string) => {
  const blob = new Blob([data], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
