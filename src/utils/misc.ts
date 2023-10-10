export const getUrlParams = (url: string) => {
  const params: string[] = [];
  const a = url.split("/:");
  for (let i = 1; i < a.length; i++) {
    let element: any = a[i];
    element = element.split("?");
    element = element[0];
    element = element.split("/");
    params.push(element[0]);
  }
  return params;
};

export const getTierName = (tierName: string) => {
  const t = tierName.split("_");
  return `${t[0]} ${t[1]}`;
};

export const isObjectEmpty = (obj: Record<string, any>): boolean => {
  for (const _i in obj) return false;
  return true;
};

export function getBase64(file: any) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

export function parseJwt(token: string) {
  const base64Url = token.split("-")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join("")
  );
  console.log(jsonPayload);
  return JSON.parse(jsonPayload);
}

export function copyText(text: string) {
  navigator.clipboard.writeText(text);
}
