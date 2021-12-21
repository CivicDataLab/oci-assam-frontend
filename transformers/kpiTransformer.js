export function kpiSelector(mainData, indicatorsData, id) {
  if (id == 'proportion-of-procurement-method-types') {
    return propProcMethod(mainData, indicatorsData);
  } else if (id == 'average-tendering-period') {
    return AvgTenderPeriod(mainData, indicatorsData);
  } else if (id == 'proportion-of-bids') {
    return PropBids(mainData, indicatorsData);
  } else if (id == 'proportion-of-saving') {
    return PropSaving(mainData, indicatorsData);
  } else if (id == 'awardee-info') {
    return TopAwardees(mainData, indicatorsData);
  }  
}

//raw data
function propProcMethod(mainData, indicatorsData) {
  let data = mainData;
  if (Object.keys(indicatorsData).length > 0) {
    Object.keys(indicatorsData).forEach((key) => {
      if (indicatorsData[key].length > 0) {
        data = data.filter((item) => indicatorsData[key].includes(item[key]));
      }
    });
  }

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

  return final_res;
}

function AvgTenderPeriod(mainData, indicatorsData) {
  let data = mainData;
  if (Object.keys(indicatorsData).length > 0) {
    Object.keys(indicatorsData).forEach((key) => {
      if (indicatorsData[key].length > 0) {
        data = data.filter((item) => indicatorsData[key].includes(item[key]));
      }
    });
  }

  // loop through data to create a nested object of value and sum e.g.
  // data_perc = {works:{open:4, sum:4},
  //            goods:{open:30, closed:70, sum:100},
  //           }

  const data_perc = {};
  const first_array = ['fiscal_year'];

  for (var i = 0; i < data.length; i++) {
    first_array.push(data[i]['tender/mainProcurementCategory']);

    if (data_perc[data[i]['fiscal_year']]) {
      if (
        data_perc[data[i]['fiscal_year']][
          data[i]['tender/mainProcurementCategory']
        ]
      ) {
        data_perc[data[i]['fiscal_year']][
          data[i]['tender/mainProcurementCategory']
        ]['sum'] =
          data_perc[data[i]['fiscal_year']][
            data[i]['tender/mainProcurementCategory']
          ]['sum'] + Number.parseFloat(data[i]['avg_duration']);
        data_perc[data[i]['fiscal_year']][
          data[i]['tender/mainProcurementCategory']
        ]['count'] =
          data_perc[data[i]['fiscal_year']][
            data[i]['tender/mainProcurementCategory']
          ]['count'] + 1;
      } else {
        data_perc[data[i]['fiscal_year']][
          data[i]['tender/mainProcurementCategory']
        ] = { count: 1, sum: Number.parseFloat(data[i]['avg_duration']) };
      }
    } else {
      var temp_obj = {};
      let temp1_obj = {
        count: 1,
        sum: Number.parseFloat(data[i]['avg_duration']),
      };
      temp_obj[data[i]['tender/mainProcurementCategory']] = temp1_obj;
      if (data[i]['fiscal_year']) data_perc[data[i]['fiscal_year']] = temp_obj;
    }
  }
  console.log('data_perc', data_perc);

  // convert the nested array values to average and
  // Format the data in required shape
  for (var key in data_perc) {
    if (Object.prototype.hasOwnProperty.call(data_perc, key)) {
      for (var prop in data_perc[key]) {
        if (Object.prototype.hasOwnProperty.call(data_perc[key], prop)) {
          //change value to average
          data_perc[key][prop] = (
            data_perc[key][prop]['sum'] / data_perc[key][prop]['count']
          ).toFixed(2);
        }
      }
    }
  }
  console.log('avg_data_perc', data_perc);

  // making the array values unique
  const header_array = [...new Set(first_array)];

  const final_res = [];
  final_res.push(header_array);

  for (var id in data_perc) {
    if (Object.prototype.hasOwnProperty.call(data_perc, id)) {
      const temp_array = [id];

      for (var j = 1; j < header_array.length; j++) {
        if (data_perc[id][header_array[j]]) {
          temp_array.push(data_perc[id][header_array[j]]);
        } else {
          temp_array.push(0);
        }
      }

      final_res.push(temp_array);
    }
  }

  return final_res;
}

function PropBids(mainData, indicatorsData) {
  let data = mainData;
  if (Object.keys(indicatorsData).length > 0) {
    Object.keys(indicatorsData).forEach((key) => {
      if (indicatorsData[key].length > 0) {
        data = data.filter((item) => indicatorsData[key].includes(item[key]));
      }
    });
  }

  // loop through data to create a nested object of value and sum e.g.
  // data_perc = {works:{open:4, sum:4},
  //            goods:{open:30, closed:70, sum:100},
  //           }
  const data_perc = {};
  const first_array = ['fiscal_year'];

  for (var i = 0; i < data.length; i++) {
    first_array.push(data[i]['number_of_bids']);

    if (data_perc[data[i]['fiscal_year']]) {
      if (data_perc[data[i]['fiscal_year']][data[i]['number_of_bids']]) {
        data_perc[data[i]['fiscal_year']][data[i]['number_of_bids']] =
          data_perc[data[i]['fiscal_year']][data[i]['number_of_bids']] +
          Number.parseInt(data[i]['tender_count']);
      } else {
        data_perc[data[i]['fiscal_year']][data[i]['number_of_bids']] =
          Number.parseInt(data[i]['tender_count']);
      }
    } else {
      var temp_obj = {};
      temp_obj[data[i]['number_of_bids']] = Number.parseInt(
        data[i]['tender_count']
      );
      if (data[i]['fiscal_year']) data_perc[data[i]['fiscal_year']] = temp_obj;
    }
  }

  // making the array values unique
  const header_array = [...new Set(first_array)];

  const final_res = [];
  final_res.push(header_array);

  for (var key in data_perc) {
    if (Object.prototype.hasOwnProperty.call(data_perc, key)) {
      let temp_array = [key];

      for (var j = 1; j < header_array.length; j++) {
        if (data_perc[key][header_array[j]]) {
          temp_array.push(data_perc[key][header_array[j]]);
        } else {
          temp_array.push(0);
        }
      }

      final_res.push(temp_array);
    }
  }

  return final_res;
}



// proportion of saving
function PropSaving(mainData, indicatorsData) {
  let data = mainData;
  if (Object.keys(indicatorsData).length > 0) {
    Object.keys(indicatorsData).forEach((key) => {
      if (indicatorsData[key].length > 0) {
        data = data.filter((item) => indicatorsData[key].includes(item[key]));
      }
    });
  }

  // loop through data to create a nested object of value and sum e.g.
  // data_perc = {works:{open:4, sum:4},
  //            goods:{open:30, closed:70, sum:100},
  //           }
  const data_perc = {};

  for(var i = 0; i<data.length; i++){
      
      if (data_perc[data[i]['fiscal_year']]) {
            if (data_perc[data[i]['fiscal_year']][data[i]['saving/overrun']]) {
                data_perc[data[i]['fiscal_year']][data[i]['saving/overrun']] = data_perc[data[i]['fiscal_year']][data[i]['saving/overrun']] + Number.parseInt(data[i]['tender_count']);
                data_perc[data[i]['fiscal_year']]['sum'] = data_perc[data[i]['fiscal_year']]['sum'] + Number.parseInt(data[i]['tender_count']);
            }
            else {
                data_perc[data[i]['fiscal_year']][data[i]['saving/overrun']] = Number.parseInt(data[i]['tender_count']); 
                data_perc[data[i]['fiscal_year']]['sum'] = data_perc[data[i]['fiscal_year']]['sum'] + Number.parseInt(data[i]['tender_count']);
            }
      }
      else {
        var temp_obj = {};
        temp_obj[data[i]['saving/overrun']] = Number.parseInt(data[i]['tender_count']);
        temp_obj['sum']           = Number.parseInt(data[i]['tender_count']) ;   
        if (data[i]['fiscal_year']) data_perc[data[i]['fiscal_year']]= temp_obj;
      }

  }

  // convert the nested array values to percentage and
  // Format the data in required shape
  const first_array = ['fiscal_year'] 
  for (var key in data_perc) {
      if (Object.prototype.hasOwnProperty.call(data_perc, key)) {    
            for (var prop in data_perc[key]) {
        if (Object.prototype.hasOwnProperty.call(data_perc[key], prop)) {
      if (prop != 'sum') {
                    // creating the header array for req format
                    first_array.push(prop);
                    //change value to perc
                    data_perc[key][prop] = (data_perc[key][prop] * 100 / data_perc[key]['sum']).toFixed(2); 
                  }
        }
            } 
      }
  }


  // making the array values unique
  const header_array = [...new Set(first_array)];


  const final_res = []
  final_res.push(header_array)


  for (var key in data_perc) {
      if (Object.prototype.hasOwnProperty.call(data_perc, key)) {
            
            let temp_array = [key]

            for(var j = 1; j<header_array.length; j++){
      if (data_perc[key][header_array[j]]) {
                      temp_array.push(data_perc[key][header_array[j]])
      }           
      else 	{
        temp_array.push(0)
      }

            }  
  
            final_res.push(temp_array)       

        }
          
  }

  return final_res;
}





// Top Awardees
function TopAwardees(mainData, indicatorsData) {
  let data = mainData;
  if (Object.keys(indicatorsData).length > 0) {
    Object.keys(indicatorsData).forEach((key) => {
      if (indicatorsData[key].length > 0) {
        data = data.filter((item) => indicatorsData[key].includes(item[key]));
      }
    });
  }

  data = data.slice(0, 10);

  // loop through data to create a nested object of value and sum e.g.
  // data_perc = {works:{open:4, sum:4},
  //            goods:{open:30, closed:70, sum:100},
  //           }
  const data_perc = {};

  for(var i = 0; i<data.length; i++){

      if (data_perc[data[i]['awardee']]) {

                data_perc[data[i]['awardee']]['tender_count'] = data_perc[data[i]['awardee']]['tender_count'] + Number.parseInt(data[i]['tender_count'])
                data_perc[data[i]['awardee']]['avg_comp']     = data_perc[data[i]['awardee']]['avg_comp'] + Number.parseFloat(data[i]['avg_comp'])
                data_perc[data[i]['awardee']]['award_val']    = data_perc[data[i]['awardee']]['award_val'] + Number.parseFloat(data[i]['award_val'])
                data_perc[data[i]['awardee']]['count']        = data_perc[data[i]['awardee']]['count'] + 1
      }
      else {
        var temp_obj = {'tender_count':Number.parseInt(data[i]['tender_count']), 'avg_comp':Number.parseFloat(data[i]['avg_comp']), 'award_val':Number.parseFloat(data[i]['award_val']), 'count':1 }; 
        if (data[i]['awardee']) data_perc[data[i]['awardee']]= temp_obj;
      }

  }



  // convert the nested array avg_comp value to average and
  // Format the data in required shape
  for (var key in data_perc) {
      if (Object.prototype.hasOwnProperty.call(data_perc, key)) {         
            data_perc[key]['avg_comp'] = Number.parseFloat((data_perc[key]['avg_comp'] / data_perc[key]['count']).toFixed(2)) ;
      }
  }



  const final_res = []

  for (var key in data_perc) {
      if (Object.prototype.hasOwnProperty.call(data_perc, key)) {
            
            let temp_array = [data_perc[key]['tender_count'], data_perc[key]['avg_comp'], data_perc[key]['award_val'], key, 'ABCD'] 
            final_res.push(temp_array)       

        }
          
  }

  return [final_res];
}

