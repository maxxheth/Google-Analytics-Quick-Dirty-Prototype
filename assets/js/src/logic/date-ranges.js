import moment from 'moment';

export const makeDateRangeObject = (num = 0, unit = "days") => ({ num_days: [num, unit] });

export const setDateRange = dateRange => dateRangeObject => {

    const momentDate = dateRangeObject[dateRange];

    const calcDateObject = moment()
    
    .subtract(...momentDate);

    return calcDateObject;

};

export const extrapolateDateRange = dateRange => dateRangeObject => calcDateObject => {

    const GAPIFormat = 'YYYY-MM-DD';

    debugger;

    if (dateRangeObject[dateRange] === undefined || calcDateObject === undefined) return;

    const dateRanges = [];

    console.info(dateRangeObject[dateRange]);

    const todaysDate = moment().format(GAPIFormat);

    const yesterdaysDate = moment().subtract(1, "day").format(GAPIFormat);

    switch(dateRange) {

        case "today": 
        
        return [todaysDate, todaysDate];

        case "yesterday": 

        return [yesterdaysDate, todaysDate];

        default: 

            for (let y = 1; y <= dateRangeObject[dateRange][0]; y++) {

                let dateRange = calcDateObject.add(1, 'days').format(GAPIFormat);

                dateRanges.push(dateRange);

            }

            // console.log(dateRanges);

        break;

    }

    

    

    return dateRanges;

};

