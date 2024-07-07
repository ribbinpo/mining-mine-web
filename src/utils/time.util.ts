export const formatDate = (date: Date): string => {
  const _date = new Date(date);
  const year = _date.getFullYear();
  const mm =
    _date.getMonth() + 1 < 10
      ? `0${_date.getMonth() + 1}`
      : (_date.getMonth() + 1).toString();
  const dd =
    _date.getDate() < 10 ? `0${_date.getDate()}` : _date.getDate().toString();

  return dd + "/" + mm + "/" + year;
};
