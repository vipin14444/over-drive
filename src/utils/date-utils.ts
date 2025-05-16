import moment from "moment";

export const DATE_UTILS = {
  formatDate: (date: Date) => {
    return moment(date).format("hh:mm, MMM DD, YYYY");
  },
};
