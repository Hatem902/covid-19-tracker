export const sortData = (data, dataSorting) =>
  data.sort((a, b) =>
    dataSorting === 'decreasing'
      ? a.cases < b.cases
        ? 1
        : -1
      : a.cases < b.cases
      ? -1
      : 1
  );
