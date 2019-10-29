import moment from 'moment';

type IFormatDateResult = {
  isPast: boolean;
  isFuture: boolean;
  formatedCardDate: string;
  getCurrentDate: string;
};

const formatDate = (d?: string): IFormatDateResult => {
  const formatedCardDate = moment(d).format('MM/DD-HH:mm');
  const YYYYMMDD = moment(d).format('YYYY-MM-DD');
  const isPast = moment(YYYYMMDD).isBefore(moment().format('YYYY-MM-DD'));
  const isFuture = moment(YYYYMMDD).isAfter(moment().format('YYYY-MM-DD'));
  const getCurrentDate = `${moment().format('YYYY-MM-DD')}T22:00`;

  return {
    isPast,
    isFuture,
    formatedCardDate,
    getCurrentDate
  };
};

export default formatDate;
