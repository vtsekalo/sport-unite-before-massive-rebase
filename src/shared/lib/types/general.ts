export type RequestMeta = {
  toast?: boolean;
  toastOnSuccess?: boolean;
  toastOnError?: boolean;
};

export type WithMeta<T> = T & { __meta?: RequestMeta };
