
const EventEmitter = require('events');
const EventsService = new EventEmitter();

const MAX = 10000;

EventsService.on('hello', x => console.log(`hello ${x}`));
EventsService.on('whois', x => console.log(`whois ${x}`));
EventsService.on('bye',   x => console.log(`bye   ${x}`));

function doit(id) {
    return new Promise(resolve => {
        let i = 0;
        for (let i = 1; i <= MAX; i++) {
            ['hello', 'whois', 'bye'].forEach(event =>
                EventsService.emit(event, `${id} - ${i}`));
        }
        resolve();
    });
};

(async () => {
    const promises = [];
    const start = Date.now();
    for (let i = 1; i <= 10; i++) {
        promises.push(doit(i));
    }
    await Promise.all(promises);
    console.log(`\nTime = ${Date.now() - start}ms`);
    console.log('Done\n');
})();
