const histogrReq = (config) => {
    let tonality = '';
    switch (config.tone) {
        case 'Любая':
            tonality = 'any';
            break;
        case 'Позитивная':
            tonality = 'positive';
            break;
        case 'Негативная':
            tonality = 'negative';
            break;
        default: tonality = 'Any'
    }

    return {
        "issueDateInterval": {
            "startDate": config.dateFrom.$d,
            "endDate": config.dateTo.$d
        },
        "searchContext": {
            "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                    {
                        "type": "company",
                        "sparkId": null,
                        "entityId": null,
                        "inn": +config.inn,
                        "maxFullness": config.cb1,
                        "inBusinessNews": config.cb2
                    }
                ],
                "onlyMainRole": config.cb3,
                "tonality": tonality,
                "onlyWithRiskFactors": config.cb4,
                "riskFactors": {
                    "and": [],
                    "or": [],
                    "not": []
                },
                "themes": {
                    "and": [],
                    "or": [],
                    "not": []
                }
            },
            "themesFilter": {
                "and": [],
                "or": [],
                "not": []
            }
        },
        "searchArea": {
            "includedSources": [],
            "excludedSources": [],
            "includedSourceGroups": [],
            "excludedSourceGroups": []
        },
        "attributeFilters": {
            "excludeTechNews": !config.cb5,
            "excludeAnnouncements": !config.cb6,
            "excludeDigests": !config.cb7
        },
        "similarMode": "duplicates",
        "limit": +config.qty,
        "sortType": "issueDate",
        "sortDirectionType": "asc",
        "intervalType": "month",
        "histogramTypes": [
            "totalDocuments",
            "riskFactors"
        ]
    }
}

export default histogrReq;