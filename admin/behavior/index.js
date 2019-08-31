



var uiModel = {
    menu: []
}

uiModel.menu=[
    {
        name: 'Dashboard',
        link:'/dashboard'
    },
    {
        name: 'Info from user',
        link: '/users'
    },
    {
        name: 'Add Post',
        link: '/create-post'
    },
    {
        name: 'Configuration',
        link: '/configuration'
    },
    {
        name: 'Log Out',
        link: '/log-out'
    }
];



var el = document.getElementById('allpages');
rivets.bind(el, uiModel)


