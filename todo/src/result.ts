type OkResult<T> = {
  type: "Ok";
  payload: T;
};

type ErrResult<E> = {
  type: "Err";
  payload: E;
};

export type Result<T, E> = OkResult<T> | ErrResult<E>;

export function Ok<T, E>(payload: T): Result<T, E> {
  return {
    type: "Ok",
    payload,
  };
}

export function Err<T, E>(payload: E): Result<T, E> {
  return {
    type: "Err",
    payload,
  };
}

export function isOk<T, E>(x: Result<T, E>): x is OkResult<T> {
  return x.type === "Ok";
}

export function isErr<T, E>(x: Result<T, E>): x is ErrResult<E> {
  return x.type === "Err";
}
