import moment from "moment";

export const DATE_UTILS = {
  formatDate: (date: Date) => {
    return moment(date).format("MMM DD, YYYY");
  },
};
