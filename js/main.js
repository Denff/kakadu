const firebaseConfig = {
    apiKey: "AIzaSyCS4f1CE8R3Prvclo7EYbdf_qVfhWfpd6w",
    authDomain: "kakadu-pikadu.firebaseapp.com",
    databaseURL: "https://kakadu-pikadu.firebaseio.com",
    projectId: "kakadu-pikadu",
    storageBucket: "kakadu-pikadu.appspot.com",
    messagingSenderId: "579106703008",
    appId: "1:579106703008:web:131024be44916324976bc5"
};
firebase.initializeApp(firebaseConfig);

console.log('firebase: ', firebase);


let menuToggle = document.querySelector('#menu-toggle');
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
const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');


const listUsers = [
    {
        id: '01',
        email: 'den@mail.com',
        password: '12345',
        displayName: 'den'
    },
    {
        id: '02',
        email: 'nastya@mail.com',
        password: '12345',
        displayName: 'nastya'
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
            if (handler){
                handler();
            }
        } else {
            alert('Пользователь с такими данными не найден')
        }
    },
    logOut(handler) {
        this.user = null;
        if (handler){
            handler();
        }
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
            if (handler){
                handler();
            }
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
        if(userPhoto) {
            this.user.photo = userPhoto;
        }
        if (handler){
            handler();
        }
    },
    autorizedUser(user) {
        this.user = user;
    }
};

const setPosts = {
    allPosts: [
        {
            title: 'Заголовок поста',
            text: 'Абракадабра',
            tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
            author: {displayName: 'den', photo: 'https://krot.info/uploads/posts/2019-09/1569316327_mjettju-makkonahi-50.jpg'},
            date: '11.11.2020',
            like: 40,
            comments: 4
        },
        {
            title: 'Заголовок поста2',
            text: 'Абракадабра',
            tags: ['свежее', 'новое', 'мое', 'случайность'],
            author: {displayName: 'den', photo: 'https://krot.info/uploads/posts/2019-09/1569316327_mjettju-makkonahi-50.jpg'},
            date: '11.11.2020',
            like: 45,
            comments: 12
        },
    ],
    addPost(title, text, tags, handler){
        this.allPosts.unshift({
            title, 
            text, 
            tags: tags.split(',').map(item => item.trim()), 
            author: {
                displayName: setUsers.user.displayName,
                photo: setUsers.user.photo,
            }, 
            date: new Date().toLocaleString(), 
            like: 0, 
            comments: 0,
        })

        if (handler){
            handler();
        }
    }
}

const toggleAuthDom = () => {
    const user = setUsers.user;

    if(user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
        userAvatarElem.src = user.photo || userAvatarElem.src;
        buttonNewPost.classList.add('visible');
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
        buttonNewPost.classList.remove('visible');
        addPostElem.classList.remove('visible');
        postsWrapper.classList.add('visible');
    }
}

const showAddPost = () => {
    addPostElem.classList.add('visible');
    postsWrapper.classList.remove('visible');
};

const showAllPosts = () => {



    let postsHTML = '';

    setPosts.allPosts.forEach( ({title, text, date, tags, like, comments, author}) => {
        postsHTML += `
        <section class="post">
            <div class="post-body">
                <h2 class="post-title">${title}</h2>
                <p class="post-text">${text}</p>
                <div class="tags">
                    ${tags.map(tag => `<a href="#" class="tag">#${tag}</a>`)}
                </div>
            </div>
            <div class="post-footer">
                <div class="post-buttons">
                    <button class="post-button likes">
                        <svg width="19" height="20" class="icon icon-like">
                            <use xlink:href="img/icons.svg#like"></use>
                        </svg>
                        <span class="likes-counter">${like}</span>
                    </button>
                    <button class="post-button comments">
                        <svg width="21" height="21" class="icon icon-comment">
                            <use xlink:href="img/icons.svg#comment"></use>
                        </svg>
                        <span class="comments-counter">${comments}</span>
                    </button>
                    <button class="post-button save">
                    <svg width="19" height="19" class="icon icon-save">
                        <use xlink:href="img/icons.svg#save"></use>
                    </svg>
                    </button>
                    <button class="post-button share">
                    <svg width="17" height="19" class="icon icon-share">
                        <use xlink:href="img/icons.svg#share"></use>
                    </svg>
                    </button>
                </div>
            
                <div class="post-author">
                    <div class="author-about">
                        <a href="#" class="author-username">${author.displayName}</a>
                        <span class="post-time">${date}</span>
                    </div>
                    <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
                </div>
            </div>
        </section>
        `;
    });

    postsWrapper.innerHTML = postsHTML;

    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
};

const init = () => {

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

    menuToggle.addEventListener('click', function (event) {
        event.preventDefault();
        menu.classList.toggle('visible');
    });

    buttonNewPost.addEventListener('click', function(event){
        event.preventDefault();
        showAddPost();
    });

    addPostElem.addEventListener('submit', event => {
        event.preventDefault();
        const { title, text, tags } = addPostElem.elements;
        if (title.value.length < 6){
            alert('Слишком короткий заголовок');
            return;
        }
        if (text.value.length < 50){
            alert('Слишком короткий пост');
            return;
        }

        setPosts.addPost(title.value, text.value, tags.value, showAllPosts);

        addPostElem.classList.remove('visible');
        addPostElem.reset();



    })

    showAllPosts();
    toggleAuthDom();    
}

document.addEventListener('DOMContentLoaded', init)
