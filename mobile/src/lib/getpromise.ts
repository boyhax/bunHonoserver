export default function getPromise<T>(promise: Promise<T>) {
  return promise
    .then(async (res) => ({ data: await (res as any).json(), error: null }))
    .catch((error) => ({ data: null, error }));
}
