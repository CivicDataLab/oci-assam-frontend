//raw data
export function kpiTransformer(mainData, indicatorsData) {
  let data = mainData;
  if (Object.keys(indicatorsData).length > 0) {
    Object.keys(indicatorsData).forEach((key) => {
      if (indicatorsData[key].length > 0) {
        data = data.filter((item) => indicatorsData[key].includes(item[key]));
      }
    });
  }

  //filter data
  // const data = main_data.filter((obj) => {
  //   return obj.tender/mainProcurementCategory === 'Goods';
  // });

  // loop through data to create a nested object of value and sum e.g.
  // data_perc = {works:{open:4, sum:4},
  //            goods:{open:30, closed:70, sum:100},
  //           }
  const data_perc = {};

  for (var i = 0; i < data.length; i++) {
    if (data_perc[data[i]['tender/mainProcurementCategory']]) {
      if (
        data_perc[data[i]['tender/mainProcurementCategory']][
          data[i]['tender/procurementMethod']
        ]
      ) {
        data_perc[data[i]['tender/mainProcurementCategory']][
          data[i]['tender/procurementMethod']
        ] =
          data_perc[data[i]['tender/mainProcurementCategory']][
            data[i]['tender/procurementMethod']
          ] + Number(data[i]['tender_count']);
        data_perc[data[i]['tender/mainProcurementCategory']]['sum'] =
          data_perc[data[i]['tender/mainProcurementCategory']]['sum'] +
          Number(data[i]['tender_count']);
      } else {
        data_perc[data[i]['tender/mainProcurementCategory']][
          data[i]['tender/procurementMethod']
        ] = Number(data[i]['tender_count']);
        data_perc[data[i]['tender/mainProcurementCategory']]['sum'] =
          data_perc[data[i]['tender/mainProcurementCategory']]['sum'] +
          Number(data[i]['tender_count']);
      }
    } else {
      const temp_obj = {};
      temp_obj[data[i]['tender/procurementMethod']] = Number(
        data[i]['tender_count']
      );
      temp_obj['sum'] = Number(data[i]['tender_count']);
      if (data[i]['tender/mainProcurementCategory'])
        data_perc[data[i]['tender/mainProcurementCategory']] = temp_obj;
    }
  }

  // convert the nested array values to percentage and
  // Format the data in required shape
  const first_array = ['tender/mainProcurementCategory'];

  for (var key in data_perc) {
    if (Object.prototype.hasOwnProperty.call(data_perc, key)) {
      for (const prop in data_perc[key]) {
        if (Object.prototype.hasOwnProperty.call(data_perc[key], prop)) {
          if (prop != 'sum') {
            // creating the header array for req format
            first_array.push(prop);
            //change value to %
            const percentValue =
              (data_perc[key][prop] * 100) / data_perc[key]['sum'];
            data_perc[key][prop] =
              Math.round((percentValue + Number.EPSILON) * 100) / 100;
          }
        }
      }
    }
  }

  // making the array values unique
  const header_array = [...new Set(first_array)];

  const final_res = [];
  final_res.push(header_array);

  for (var method in data_perc) {
    if (Object.prototype.hasOwnProperty.call(data_perc, method)) {
      const temp_array = [method];

      for (var j = 1; j < header_array.length; j++) {
        if (data_perc[method][header_array[j]]) {
          temp_array.push(data_perc[method][header_array[j]]);
        } else {
          temp_array.push(0);
        }
      }

      final_res.push(temp_array);
    }
  }
  console.log('final_res', final_res);

  return final_res;
}
