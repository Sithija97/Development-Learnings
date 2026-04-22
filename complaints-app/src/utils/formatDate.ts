import dayjs from "dayjs";
import "dayjs/locale/en";

export const formatDate = (date: string) => {
  const dateObject = dayjs(date);
  const formattedDate = dateObject.format("YYYY-MM-DD HH:mm:ss");
  return formattedDate;
};
