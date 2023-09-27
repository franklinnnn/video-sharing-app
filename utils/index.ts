export const getRelativeTime = (timestamp: number) => {
  const date = new Date();
  const time = date.getTime();
  const seconds = Math.floor(time / 1000);
  const difference = seconds - timestamp;
  let output = "";

  if (difference < 60) {
    // Less than a minute has passed:
    output = `just now`;
  } else if (difference < 120) {
    output = `${difference} seconds ago`;
  } else if (difference < 3600) {
    // Less than an hour has passed:
    output = `${Math.floor(difference / 60)} minutes ago`;
  } else if (difference < 86400) {
    // Less than a day has passed:
    output = `${Math.floor(difference / 3600)} hours ago`;
  } else if (difference < 2620800) {
    // Less than a month has passed:
    output = `${Math.floor(difference / 86400)} days ago`;
  } else if (difference < 31449600) {
    // Less than a year has passed:
    output = `${Math.floor(difference / 2620800)} months ago`;
  } else {
    // More than a year has passed:
    output = `${Math.floor(difference / 31449600)} years ago`;
  }
  return output;
};
