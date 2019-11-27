javascript:(function () {
    let url = new URL("http://kibana:5601/s/black/elasticsearch/_msearch");
    let rawbody = '{"index":"mrs-eventlog-*"}\n{"version":true,"size":500,"sort":[{"@timestamp":{"order":"desc","unmapped_type":"boolean"}}],"_source":["mrs.eventlog.AlarmName"],"query":{"bool":{"must":[{"match_all":{}},{"match_all":{}}],"filter":[{"match_phrase":{"mrs.eventlog.Source":{"query":"iMosWeb"}}},{"match_phrase":{"mrs.eventlog.AlarmLevel":{"query":"High"}}},{"range":{"@timestamp":{"gte":"now-11h","lte":"now+1h"}}}],"should":[],"must_not":[{"bool":{"minimum_should_match":1,"should":[{"match_phrase":{"mrs.eventlog.SystemName":"REF"}},{"match_phrase":{"mrs.eventlog.SystemName":"DEV"}}]}},{"match_phrase":{"mrs.eventlog.AlarmLevel":{"query":"Info"}}},{"match_phrase":{"mrs.eventlog.confirmed":{"query":"1"}}}]}}}\n';
    let headers = {
        "content-type": "application/x-ndjson",
        "kbn-xsrf": "set"
    };
    fetch(url, {
        method: 'POST',
        body: rawbody,
        headers: headers
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        alert(data.responses[0].hits.hits[0]._source["mrs.eventlog.AlarmName"]);
    });
})
();
