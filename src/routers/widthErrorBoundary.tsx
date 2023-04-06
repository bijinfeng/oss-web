import type { FC } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { get } from "lodash-es";

export const widthErrorBoundary = <T, D>(
  Comp: React.ComponentType<Omit<T, "data"> & { data: D }>,
  select: string
) => {
  const ErrorBoundary: FC<Omit<T, "data">> = (props) => {
    const data = useLoaderData();

    return (
      <Await
        resolve={get(data, select)}
        errorElement={<p>Error loading package location!</p>}
      >
        {($data: D) => <Comp {...props} data={$data} />}
      </Await>
    );
  };
  return ErrorBoundary;
};
