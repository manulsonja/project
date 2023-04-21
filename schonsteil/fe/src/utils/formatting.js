export const roundToDeciKMs = (meters) => {
    const kms = meters/1000;
    const formatted = kms.toFixed(1);
    return formatted;
  }

  export const format_duration = (duration) => {
	if ((!duration || duration.length === 0) ) return;

  const time_array = duration.split(':');
  let return_string = "";

  if(!(time_array[0]==='00')) return_string+=time_array[0]+"Tage";
  if(!(time_array[1]==='00')) return_string+=time_array[1]+"h";
  if(!(time_array[2]==='00')) return_string+=time_array[2]+"m";

  return return_string;

};