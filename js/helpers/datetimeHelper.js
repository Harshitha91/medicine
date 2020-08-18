import moment from 'moment';
import { SERVER_TIME_ZONE } from '../../config';

export const localTime = (dateTime, format, onSubmit = false) => {
  if (onSubmit) {
    return moment(dateTime).format(format);
  } else {
    return moment(dateTime).utcOffset(parseInt(SERVER_TIME_ZONE), true).utc().local().format(format);
  }
}