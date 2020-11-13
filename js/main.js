// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');


const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;


const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUserName = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');

const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');


const listUsers = [
    {
        id: '01',
        email: 'den@mail.com',
        password: '12345',
        displayName: 'DenJS'
    },
    {
        id: '02',
        email: 'nastya@mail.com',
        password: '12345',
        displayName: 'AnastasiaCSS'
    }
];

const setUsers = {
    user: null,
    logIn(email, password, handler) {
        if (!regExpValidEmail.test(email)) {
            alert('email не валиден');
            return;
        }
        const user = this.getUser(email);
        if (user && user.password === password){
            this.autorizedUser(user);
            handler();
        } else {
            alert('Пользователь с такими данными не найден')
        }
    },
    logOut(handler) {
        this.user = null;
        handler();
    }, 
    signUp(email, password, handler) {
        if (!regExpValidEmail.test(email)) {
            alert('email не валиден');
            return;
        }       
        if( !email.trim() || !password.trim() ) {
            alert('Введите данные');
            return; 
        }
        
        if(!this.getUser(email)){
            const user = { email, password, displayName: email.substring(0, email.indexOf('@')) };
            listUsers.push(user);
            this.autorizedUser(user);
            handler();
        } else {
            alert('Пользователь с таким именем уже зарегестирован')
        }
    },
    getUser(email) {
        return listUsers.find(item => item.email === email )
    },
    editUser(userName, userPhoto, handler){
        if(userName){
            this.user.displayName = userName;
        }
        if(userPhoto){
            this.user.photo = userPhoto;
        }
        handler();
    },
    autorizedUser(user){
        this.user = user;
    }
};
const setPosts = {
    allPost: [
        {
            title: 'Заголовок поста',
            text: 'Абракадабра',
            tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
            author: 'email@email.ru',
            date: '11.11.2020',
            like: 45,
            comments: 12
        },
        {
            title: 'Заголовок поста',
            text: 'Абракадабра',
            tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
            author: 'mail@mail.ru',
            date: '11.11.2020',
            like: 45,
            comments: 12
        },
    ]
}


const toggleAuthDom = () => {
    const user = setUsers.user;

    if(user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
        userAvatarElem.src = user.photo || userAvatarElem.src;
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';

    }
}


const showAllPosts = () => {
    postsWrapper.innerHTML = 'тут могла быть ваша реклама'
}

const init = () => {
    // отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
});
    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const emailVal = emailInput.value;
        const passVal = passwordInput.value;

        setUsers.logIn(emailVal, passVal, toggleAuthDom);
        loginForm.reset();
    });

    loginSignup.addEventListener('click', (event) => {
        event.preventDefault();
        
        const emailVal = emailInput.value;
        const passVal = passwordInput.value;

        setUsers.signUp(emailVal, passVal, toggleAuthDom);
        loginForm.reset();
    });

    exitElem.addEventListener('click', (event) => {
        event.preventDefault();
        setUsers.logOut(toggleAuthDom);    

    });

    editElem.addEventListener('click', (event) => {
        event.preventDefault();
        editContainer.classList.toggle('visible');
        editUserName.value = setUsers.user.displayName
    });

    editContainer.addEventListener('submit', (event) => {
        event.preventDefault();
        
        setUsers.editUser(editUserName.value, editPhotoURL.value, toggleAuthDom);
        editContainer.classList.remove('visible');
    });

    showAllPosts();
    toggleAuthDom();    
}

document.addEventListener('DomContentLoaded', init)
