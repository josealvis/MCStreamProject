let  config = require('./config');
let mockData = require('../../test/mockData');




test("It should return data", ()=>{
    config.mediaObjectMapper.mediaObject =  mockData.generateDummyData(3,6);
    let data  = config.mediaObjectMapper.getMediabyIdhash("rp1m1");
    expect(data.hashId).toBe("rp1m1");
    data  = config.mediaObjectMapper.getMediabyIdhash("rp1m2");
    expect(data.hashId).toBe("rp1m2");
    data  = config.mediaObjectMapper.getMediabyIdhash("rp3m6");
    expect(data.hashId).toBe("rp3m6");
    expect(data.path != undefined).toBe(true);

})

