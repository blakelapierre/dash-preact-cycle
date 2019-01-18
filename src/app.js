import { h, render } from 'preact-cycle';

window.Notification.requestPermission();

document.body.addEventListener('drop', event => {
  console.log('drop', event);
  event.preventDefault();
  event.stopPropagation();
  return false;
});

setTimeout(() => new Notification('test'), 5000); // not showing on phone seems to be bug


// API

/*
  ....pretty sure

  postMessage

*/

const renderers = {
  'string': i => i,

  'function': fn => ({
    'Websites': { }, // should just be 'option', now that it is function
    'Twitter':
      i => <twitter>{Website(`https://twitter.com/${fn(i)}`)}</twitter>,
    'Github':
      i => <github>{Website(`https://github.com/${fn(i)}`)}</github>,
    'reddit':
      i => <reddit>{Website(`http://old.reddit.com/${fn(i)}`)}</reddit>,



    'p2pRocks':
      i =>
        <p2p-rocks>
          {Website(`https://p2p.rocks`)}
        </p2p-rocks>,

    'dashTwitter': DashList('twitter-blakelapierre', TwitterDashRenderer),

    'block': i => <block>{Website(`https://locd.xyz`)}</block>


  })[fn.name](fn)

};

function TwitterDashRenderer (listName, fn, mutation) {
  return (
    <twitter>
      {listName}
    </twitter>
  );
}

const wal = localStorageStateLogThing({}, {
  'test': ([name, value, ...rest]) => {
    console.log({name, value});
  }
});

wal('test', 'value', 'rest', 'more');

function localStorageStateLogThing (state, processors, logWritesBeforeCompact = 10, compactsBeforeStateWrite = 5) {
  const log = [], baseName = 'testName-', stateName = 'state';
  let nextName = baseName + '0', nextCompactName = baseName + 'compact-0', totalCompacts = 0, compactsSinceLastStateWrite = 0;

  log.splice(0, 0, ...readLogs(baseName, logWritesBeforeCompact));

  // for (let i = 0; i < logWritesBeforeCompact; i++) {
  //   try {
  //     const value = JSON.parse(localStorage.getItem(baseName + i));

  //     if (value === null || value === undefined) break;

  //     log.push(value);
  //   }
  //   catch (e) {
  //     break;
  //   }
  // }

  // for (let i = 0; i < compactsBeforeStateWrite; i++) {

  // }

  function readLogs (baseName, max) {
    const log = [];
    for (let i = 0; i < max; i++) {
      try {
        const value = JSON.parse(localStorage.getItem(baseName + i));

        if (value === null || value === undefined) break;

        log.push(value);
      }
      catch (e) {
        break;
      }
    }
    return log;
  }

  console.log({log});

  return (...args) => {
    const value = [...args];

    log.push(value);

    nextName = baseName + (log.length - 1);
    localStorage.setItem(nextName, JSON.stringify(value));

    if (log.length > logWritesBeforeCompact) {
      //compact
      localStorage.setItem(nextCompactName, JSON.stringify(log));

      totalCompacts++;
      compactsSinceLastStateWrite++;

      nextCompactName = baseName + 'compact-' + totalCompacts

      if (compactsSinceLastStateWrite > compactsBeforeStateWrite) {
        localStorage.setItem(stateName, JSON.stringify(state));

        compactsSinceLastStateWrite = 0;
      }

      for (let i = log.length - 1; i >= 0; i--) {
        localStorage.removeItem(baseName + i);
      }

      log.splice(0, log.length - 1);
    }

    // state.process(value);
    processors[value[0]](value);
  };
}


/*
  writeLog


*/



/*
thinking about other things/projects/etc


*/

// const socket = new WebSocket(`ws://${window.location.hostname}:3333/lists/${listName}`);
// const socket = new WebSocket(`ws://${window.location.hostname}:3333/lists/`);

// socket.addEventListener('message', event => {
//   console.log(event);
// });

function DashList (listName, renderer) {
  return (fn, mutation) => (
    <dash-list>
      {renderer(listName, fn, mutation)}
    </dash-list>
  );
}



function addRenderer(fn) {
  renderers.function[fn.name] = renderers.function[fn.name] || fn;
}

//it's going to be .(some)... "incoming communications"
render(
  Dash, {
    list: [
      // function Twitter (fn, i) {//   return 'blakelapierre'; // },
      // function Github (arg) {//   return 'blakelapierre'; // },
      // function reddit () { return '/r/all'; }



      // function dashTwitter() {},
      // function 'p2pRocks'() {},
      mkFn('p2pRocks'),
      mkFn('p2pRocks'),
      // nameFunction('p2pRocks'),

      mkFn('block')

    ]
  }, document.body
);

//https://stackoverflow.com/a/41854075
function nameFunction (name, body = () => {}) {
  return {[name](...args) {return body(...args)}}[name];
}

function mkFn (name, fn) {
  const f = new Function();
  Object.defineProperty(f, 'name', {value: name, writable: false});
  return f;
}

function mkFn2 (name, fn) {
  return new Function(``);
}

function Dash ({list}, {mutation}) {
  return (
    <dash>
      {list.map(i => <IR i={i} />)}
    </dash>
  );
}

function IR ({i}, {mutation}) {
  return renderers[typeof i](i, mutation);
}









function Website(uri, title = true) {
  return (
    <website>
      {title ? <t>{uri}</t> : undefined}
      <iframe src={uri} frameborder={0}></iframe>
    </website>
  );

}