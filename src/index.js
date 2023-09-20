/**
 *  Index page handler
 */
import '../styles/styles.scss';
import '../styles/index.scss';


let pages = [
    { root: 'home', page: 'homePage' },
    { root: 'about', page: 'aboutPage' },
];

routeDefault(); // Initiate default routing function

function routeDefault() {
    crossroads.addRoute('', () => {
        window.location.href = '#/home'; // At initial page load href value updated as `home` for route.
    });
}

crossroads.addRoute('/{val}', () => {
    let pageObj = getPageObj(window.location.hash.replace('#/', ''));
    let ajaxHTML = new ej.base.Ajax('./' + pageObj.page + '.html', 'GET', true);
    ajaxHTML.send().then((value) => {
        if (document.getElementById('content-area')) {
            (document.getElementById('content-area')).innerHTML = value.toString();
        }
        if (window.location.hash.replace('#/', '') === 'home') {
            window.home();
        } else {
            window.about();
        }
    })
    .catch((error) => {
        // Handle any potential Promise rejections
        console.error('An error occurred:', error);
      });
});

function getPageObj(page) {
    let pageObj = {};
    pages.forEach((item) => {
        if (item.root === page) {
            pageObj = item;
        }
    });
    return pageObj;
}

// Window location hash handlers
hasher.initialized.add((hashValue) => {
    crossroads.parse(hashValue); // Page initial loading state this function calls '' route handler.
});

hasher.changed.add((hashValue) => {
    crossroads.parse(hashValue); // When location hash changed this function calls `home` route handler.
});
hasher.init(); // Initiate the hasher function