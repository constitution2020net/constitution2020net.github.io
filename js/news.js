'use strict';

const showMoreBtn = document.querySelector('.js-show-more');

showMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    const apiUrl = showMoreBtn.href;
    showMoreBtn.href = '';

    xhr.open('GET', apiUrl);
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const newsBlock = document.querySelector('.news-section__cards');
            const response = JSON.parse(xhr.responseText);
            newsBlock.dataset.page = response['page'];
            newsBlock.innerHTML += response['news'];
            showMoreBtn.href = response['href'];
            showMoreBtn.blur();

            if (parseInt(response['page']) === parseInt(newsBlock.dataset.pages)) {
                document.querySelector('.news-section__button').remove();
            }
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            document.querySelector('.news-section__button').remove();
        }
    });
    xhr.send();
});
