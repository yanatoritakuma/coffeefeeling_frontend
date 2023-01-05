import React, { memo, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

type Props = {
  count: number;
  nowPage: number;
  setNowPage: React.Dispatch<React.SetStateAction<number>>;
};

export const PaginationBox = memo((props: Props) => {
  const { count, nowPage, setNowPage } = props;

  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={nowPage}
        onChange={(e, page) => setNowPage(page)}
        variant="outlined"
        color="primary"
        siblingCount={0}
      />
    </Stack>
  );
});
