const urlParams = new URLSearchParams(window.location.search);
page_nb = parseInt(urlParams.get("page"));
if (isNaN(page_nb)) {
    page_nb = 0;
}

base_url = window.location.origin + window.location.pathname;
url_nohtml = base_url.split("/")
url_nohtml.pop()
url_nohtml = url_nohtml.join("/");

function change_page(nb){
    document.body.style.animation = 'fadeOut 1s ease-in-out forwards';
    setTimeout(function(){
        window.location.href = url_nohtml + nb;
    }, 1000);
}