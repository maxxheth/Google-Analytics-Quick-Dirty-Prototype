export const createDataset = metrics => (...bgColors) => (...bdColors) => {

    const { metricDataResultsKey, metricDataResultsArray } = metrics;

    const backgroundColor = [...bgColors];

    const borderColor = [...bdColors];

    const datasetProps = {

        label: metricDataResultsKey,
        data: metricDataResultsArray,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
    };

    return datasetProps;


};