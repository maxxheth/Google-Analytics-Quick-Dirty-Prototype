import moment from 'moment';

export const dateRangeObj = {

    today: [0, "days"],
    yesterday: [1, "days"],
    seven_days: [7, "days"],
    fourteen_days: [14, "days"],
    twentyeight_days: [28, "days"]

};

export const makeDateRangeObj = (num = 0, unit = "days") => ({ num_days: [num, unit] });

export const setDateRange = dateRange => dateRangeObj => {

    const momentDate = dateRangeObj[dateRange];

    const calcDateObj = moment()
    
    .subtract(...momentDate);

    return calcDateObj;

};

export const extrapolateDateRange = dateRange => dateRangeObj => calcDateObj => {

    const GAPIFormat = 'YYYY-MM-DD';

    if (dateRangeObj[dateRange] === undefined || calcDateObj === undefined) return;

    const dateRanges = [];

    switch(dateRangeObj[dateRange]) {

        case 'today': 
        
        return moment().format(GAPIFormat);

        default: 

            for (let y = 1; y <= dateRangeObj[dateRange][0]; y++) {

                let dateRange = calcDateObj.add(1, 'days').format(GAPIFormat);

                dateRanges.push(dateRange);

            }

        break;

    }

    return dateRanges;

};

