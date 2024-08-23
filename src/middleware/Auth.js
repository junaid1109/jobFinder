export default (to, from, next) => {

    var type = (localStorage.getItem('type') && localStorage.getItem('type') !== '') ? localStorage.getItem('type') : '';
    if(type=='"provider"'){
        var auth = (localStorage.getItem('provider') && localStorage.getItem('provider') !== '') ? true : false;
        // Check if the user is trying to access the login page
        if (to.path === '/login' || to.path === '/'){
            if (auth) {
                // If the user is already authenticated, redirect to the dashboard or some other page
                next('/provider/home'); // Adjust the path accordingly
            } else {
                // If the user is not authenticated, proceed to the login page
                next();
            }
        } else {
            // Check if the user is authenticated for other routes
            if (auth) {
                next();
            } else {
                // If the user is not authenticated, redirect to the login page
                next('/login'); // Adjust the path accordingly
            }
        }
    }else{
        var auth = (localStorage.getItem('user') && localStorage.getItem('user') !== '') ? true : false;
        // Check if the user is trying to access the login page
        if (to.path === '/login' || to.path === '/'){
            if (auth) {
                // If the user is already authenticated, redirect to the dashboard or some other page
                next('/home'); // Adjust the path accordingly
            } else {
                // If the user is not authenticated, proceed to the login page
                next();
            }
        } else {
            // Check if the user is authenticated for other routes
            if (auth) {
                next();
            } else {
                // If the user is not authenticated, redirect to the login page
                next(); // Adjust the path accordingly
            }
        }
    }
};