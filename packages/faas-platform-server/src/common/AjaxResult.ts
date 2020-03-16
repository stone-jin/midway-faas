export function success(data: any) {
  return {
    code: 200,
    data
  };
}

export function fail(data: any, message: string) {
  return {
    code: 500,
    data,
    message
  };
}
