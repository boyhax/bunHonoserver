export default function getPromise<T>(promise: Promise<T>) {
  return promise
    .then((data) => ({ data, error: null }))
    .catch((error) => ({ data: null, error }));
}
