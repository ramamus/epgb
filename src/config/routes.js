/**
 *  Register your app routes here. Each entry must include:
 *      - path '/{page}'
 *      - page (name of the page component in your src/pages directory)
 *      - title (to be displayed in browser)
 *
 *  By default, every route except for the homepage ('/') will show as a tab
 *  in the navigation subheader.
 *  You can make an individual route have no tab by specifying {showTab: false}
 *  You can hide the navigation subheader entirely by setting {showTabs: false}
 *  in your Hubble Header component.
 *
 *  Don't forget to specify which page is the homepage ('/')
 */

export default [
  {
    path: '/',
    page: 'Players',
    title: 'Players List'
  },
  {
    path: '/reports',
    page: 'Reports',
    title: 'Player Report'
  }
];
