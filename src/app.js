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

    'block': i => <block>{Website(`http://localhost:4444`)}</block>


  })[fn.name](fn)

};

function TwitterDashRenderer (listName, fn, mutation) {
  return (
    <twitter>
      {listName}
    </twitter>
  );
}


function localStorageStateLogThing (logWritesBeforeCompact = 10) {

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
      function p2pRocks() {},
      function p2pRocks() {},

      function block() {}

    ]
  }, document.body
);

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