import { checkType } from '../helper-funcs/checktype';

export const liftMetricPropsFromArray = metricArray => {


    return metricArray.reduce( ( acc, curr ) => {

        const { metricData } = curr;

        const { metricName, metricValue } = metricData;

        if ( checkType( acc[ metricName ] ) !== 'array') {

            acc[ metricName ] = []; 

        } else {

            acc[ metricName ].push( metricValue );

        }

        return acc;

    }, {});

};

